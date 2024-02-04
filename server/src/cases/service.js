const {
  Cases,
  Comments,
  Users,
  CasesProgress,
  SmsQueue,
  Avatar,
  AtrialFibrillations,
  HeartFailures,
  Questionnaire,
} = require("../models");
const { Op } = require("sequelize");
const sms = require("../sms/service");

const casesProgressFilter = {
  openSms: {
    where: {
      openSms: { [Op.ne]: null },
      avatarSelection: { [Op.eq]: null },
    },
  },
  avatarSelection: {
    where: {
      avatarSelection: { [Op.ne]: null },
      watchedVideo: { [Op.eq]: null },
    },
  },
  watchedVideo: {
    where: {
      watchedVideo: { [Op.ne]: null },
    },
  },
};

const zehutFilter = ({ zehutNumber }) =>
  zehutNumber ? { zehutNumber: { [Op.substring]: zehutNumber } } : {};

const myCasesFilter = ({ myCases }, creatorId) =>
  myCases ? { creatorId } : {};

module.exports.search = async ({ creatorId, search }) => {
  console.info(`search ${search} by ${creatorId}`);
  const cases = await Cases.findAll({
    include: [
      {
        model: Users,
        attributes: ["id", "language", "phoneNumber"],
        include: [
          {
            model: Questionnaire,
            where: {
              questionKey: {
                [Op.ne]: "clinicPicker",
              },
            },
            attributes: ["questionKey", "answerKey"],
          },
        ],
      },
      { model: Comments },
      { model: AtrialFibrillations },
      { model: HeartFailures },
      {
        model: CasesProgress,
        attributes: ["openSms", "avatarSelection", "watchedVideo"],
        ...casesProgressFilter[search.patientStatus],
      },
      Avatar,
    ],
    attributes: ["id", "zehutNumber", "gender", "age", "createdAt"],
    where: {
      ...zehutFilter(search),
      ...myCasesFilter(search, creatorId),
    },
    order: [["createdAt", "DESC"]],
    offset: 0,
    limit: 30,
  });

  return cases;
};

module.exports.create = async ({
  creatorId,
  phoneNumber,
  zehutNumber,
  yearOfBirth,
  atrialFibrillation,
  heartFailure,
}) => {
  console.info(`create case by staff member: ${creatorId}`);
  const newCase = await Cases.create({
    creatorId,
    zehutNumber,
    yearOfBirth,
  });
  const CaseId = newCase.dataValues.id;
  const user = await Users.create({ CaseId, phoneNumber });
  if (atrialFibrillation) {
    await AtrialFibrillations.create({
      CaseId,
      ...atrialFibrillation,
    });
  }
  if (heartFailure) {
    await HeartFailures.create({
      CaseId,
      ...heartFailure,
    });
  }
  await sms.action({ UserId: user.id, actionKey: "create-case" });
  await sms.sendImmediate({ CaseId, type: "caseCreation", phoneNumber });
};

module.exports.deleteCase = async ({ CaseId, staffMembersId }) => {
  console.info(`Delete ${CaseId} by ${staffMembersId}`);
  await Cases.destroy({ where: { id: CaseId } });
  await Users.destroy({ where: { CaseId } });
  const reminders = await SmsQueue.findAll({
    include: { model: Users, where: { CaseId }, paranoid: false },
  });
  reminders.forEach((reminder) => reminder.destroy());
};

module.exports.CommentCase = async ({ CaseId, comment, creatorId }) => {
  console.info(`Post comment  case:${CaseId}  comment:${comment}`);
  await Comments.create({ CaseId, creatorId, message: comment });
};

module.exports.duplicate = async (data) => {
  const { phoneNumber, zehutNumber } = data;
  const caseExists = await Cases.findOne({
    where: { zehutNumber },
    include: { model: Users, where: { phoneNumber } },
  });
  if (caseExists) return "duplicate";
  return "none";
};
