const { DataTypes } = require("sequelize");

const init = (sequelize) =>
  sequelize.define(
    "Questionnaire",
    {
      UserId: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      questionKey: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      answerKey: DataTypes.STRING,
    },
    { underscored: true, paranoid: true }
  );

const associations = (sequelize) => {
  const { Questionnaire, Users } = sequelize.models;
  Questionnaire.belongsTo(Users);
};

module.exports = { init, associations };
