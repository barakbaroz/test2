const { Op } = require("sequelize");
const {
  Users,
  UserActions,
  Cases,
  CasesProgress,
  Avatar,
  HeartFailures,
  AtrialFibrillations,
  Questionnaire,
} = require("../models");
const sms = require("../sms/service");

const MAX_ATTEMPTS = 2;

module.exports.getAuthStatus = async ({ userId }) => {
  const user = await Users.findOne({
    where: { id: userId, failedAttempts: { [Op.lt]: MAX_ATTEMPTS } },
    attributes: ["id", "failedAttempts"],
  });
  if (user) return "idle";
  return "blocked";
};

module.exports.lastStep = async ({ userId, sending: defaultSending }) => {
  const user = await Users.findByPk(userId, {
    required: false,
    include: {
      model: Cases,
      include: [
        CasesProgress,
        { model: HeartFailures, required: false },
        { model: AtrialFibrillations, required: false },
      ],
    },
  });
  if (!user) return "not-found";
  const {
    avatarSelection,
    answeredClinicQuestionnaire,
    answeredMedicationQuestionnaire,
  } = user.Case.CasesProgress;
  let sending = defaultSending || this.getDefaultSendingType(user);
  if (!avatarSelection) return `/user/${sending}/start`;
  if (!user.Case.AtrialFibrillation) return `/user/${sending}/video-page-heart`;
  if (sending === "first" && answeredClinicQuestionnaire)
    return `/user/${sending}/video-page-atrial`;
  if (sending === "second" && answeredMedicationQuestionnaire)
    return `/user/${sending}/video-page-atrial`;
  return `/user/${sending}/start`;
};

module.exports.verify = async ({
  id,
  zehutNumber,
  yearOfBirth,
  department,
  rememberMe,
}) => {
  const user = await Users.findByPk(id, {
    include: { model: Cases, required: true },
  });
  if (!user) return { status: "blocked" };
  const verifyObj = {
    zehutNumber: user.Case.zehutNumber === zehutNumber,
    yearOfBirth: user.Case.yearOfBirth === yearOfBirth,
    department: "heart" === department,
    rememberMe,
    attempt: user.failedAttempts + 1,
  };
  verifyObj.success =
    verifyObj.zehutNumber && verifyObj.yearOfBirth & verifyObj.department;
  this.userAction({ UserId: id, type: "verify-attempt", data: verifyObj });
  if (verifyObj.success) {
    user.update({ failedAttempts: 0 }, { where: { id } });
    return { user };
  }
  user.failedAttempts += 1;
  user.save();
  return {
    status: user.failedAttempts >= MAX_ATTEMPTS ? "blocked" : "failed",
  };
};

function processUserData(user) {
  if (!user) return null;
  user.dataValues.Questionnaires = Object.fromEntries(
    user.Questionnaires.map(({ questionKey, answerKey }) => [
      questionKey,
      answerKey,
    ])
  );
  return user.dataValues;
}

module.exports.getData = async ({ userId }) => {
  const user = await Users.findByPk(userId, {
    attributes: ["id", "language"],
    include: [
      { model: Questionnaire, attributes: ["questionKey", "answerKey"] },
      {
        model: Cases,
        required: false,
        attributes: ["id", "gender", "age", "createdAt"],
        include: [
          {
            model: CasesProgress,
            attributes: ["avatarSelection", "satisfactionAnswer"],
          },
          { model: Avatar, attributes: ["gender", "age", "ethnicity"] },
          { model: HeartFailures, attributes: ["heartConditions", "symptoms"] },
          {
            model: AtrialFibrillations,
            attributes: ["patientType", "medicine", "patientSeniority"],
          },
        ],
      },
    ],
  });
  return processUserData(user);
};

module.exports.update = async ({ id, data }) => {
  const { gender, age, language } = data;
  const caseByUserId = await Cases.findOne({
    include: [{ model: Users, where: { id } }, Avatar],
  });
  await caseByUserId.update({ gender, age });
  await caseByUserId.User.update({ language });
  await caseByUserId.Avatar.update(data.Avatar);
};

const typeToColumn = {
  "opened-sms": "openSms",
  "general-information-answered": "avatarSelection",
  "submit-clinic-questionnaire": "answeredClinicQuestionnaire",
  "submit-medication-questionnaire": "answeredMedicationQuestionnaire",
  "watched-video-atrial-fibrillation": "watchedVideoAtrialFibrillation",
  "watched-video-heart-failure": "watchedVideoHeartFailure",
  "satisfaction-question": "satisfactionAnswer",
};

const updateCasesProgress = async ({ UserId, type }) => {
  const column = typeToColumn[type];
  if (!column) return;
  const caseProgress = await CasesProgress.findOne({
    where: { [column]: { [Op.eq]: null } },
    include: {
      model: Cases,
      required: true,
      include: {
        model: Users,
        where: { id: UserId },
      },
    },
  });
  if (!caseProgress) return;
  await caseProgress.update({ [column]: new Date() });
};

module.exports.userAction = async ({ UserId, type, data }) => {
  await UserActions.create({ UserId, type, data });
  await sms.action({ UserId, actionKey: type });
  await updateCasesProgress({ UserId, type });
};

module.exports.userVideoAction = async ({ UserId, type, data }) => {
  const [actionRecord] = await UserActions.findOrCreate({
    where: { UserId, type },
    defaults: { data: { percentage: 0, location: 0 } },
  });

  const oldPercentage = actionRecord.data.percentage;

  actionRecord.data = {
    percentage: Math.max(actionRecord.data.percentage, data.percentage),
    location: Math.max(actionRecord.data.location, data.location),
  };
  actionRecord.save();

  if (actionRecord.data.percentage >= 75 && oldPercentage < 75) {
    await updateCasesProgress({ UserId, type });
    await sms.action({ UserId, actionKey: type });
  }
};

module.exports.updateQuestionnaire = async ({ id, answers, type }) => {
  this.userAction({ UserId: id, type: `submit-${type}-questionnaire` });
  const answersArray = Object.entries(answers).map(
    ([questionKey, answerKey]) => ({ questionKey, answerKey })
  );
  answersArray.forEach((answer) => (answer.UserId = id));
  await Questionnaire.bulkCreate(answersArray, {
    updateOnDuplicate: ["answerKey"],
  });
};

const fourDays = 1000 * 60 * 60 * 24 * 4;
module.exports.getDefaultSendingType = (user) => {
  const { AtrialFibrillation, createdAt } = user.Case;
  if (!AtrialFibrillation) return "first";
  if (AtrialFibrillation.patientSeniority === "regularly") return "first";
  if (new Date() - fourDays < new Date(createdAt)) return "first";
  return "second";
};
