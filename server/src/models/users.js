const { DataTypes } = require("sequelize");

const init = (sequelize) =>
  sequelize.define(
    "Users",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      phoneNumber: DataTypes.STRING(15),
      language: { type: DataTypes.STRING, defaultValue: "he" },
      failedAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { underscored: true, paranoid: true }
  );

const associations = (sequelize) => {
  const { Users, SmsTracking, Cases, UserActions, SmsQueue, Questionnaire } =
    sequelize.models;
  Users.belongsTo(Cases);
  Users.hasMany(UserActions);
  Users.hasMany(SmsTracking);
  Users.hasMany(SmsQueue, { onDelete: "CASCADE" });
  Users.hasMany(Questionnaire);
};

module.exports = { init, associations };
