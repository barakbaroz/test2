const { DataTypes } = require("sequelize");

const init = (sequelize) =>
  sequelize.define(
    "CasesProgress",
    {
      CaseId: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      openSms: DataTypes.DATE,
      avatarSelection: DataTypes.DATE,
      watchedVideo: DataTypes.DATE,
      answeredQuestionnaire: DataTypes.DATE,
      satisfactionAnswer: DataTypes.DATE,
    },
    { underscored: true }
  );

const associations = (sequelize) => {
  const { CasesProgress, Cases } = sequelize.models;
  CasesProgress.belongsTo(Cases);
};

module.exports = { init, associations };
