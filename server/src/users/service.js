const { Op } = require("sequelize");
const {
  Users,
  UserActions,
  Cases,
  CasesProgress,
  Avatar,
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

module.exports.lastStep = async ({ userId }) => {
  const user = await Users.findByPk(userId, {
    include: { model: Cases, include: CasesProgress },
  });
  const { avatarSelection } = user.Case.CasesProgress;
  if (avatarSelection) return "Video";
  return "Start";
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
    department: "heart-failure" === department,
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

module.exports.getData = async ({ userId }) => {
  return await Users.findByPk(userId, {
    attributes: ["id", "language"],
    include: [
      {
        model: Cases,
        attributes: ["id", "gender", "age", "heartConditions", "symptoms"],
        include: [CasesProgress, Avatar],
      },
    ],
  });
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
  "watched-video": "watchedVideo",
  "Satisfaction-question": "satisfactionAnswer",
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
