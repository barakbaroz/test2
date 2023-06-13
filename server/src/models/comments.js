const { DataTypes } = require("sequelize");

const init = (sequelize) =>
  sequelize.define(
    "Comments",
    {
      message: DataTypes.STRING,
    },
    { underscored: true }
  );

const associations = (sequelize) => {
  const { Cases, Comments, StaffMembers } = sequelize.models;
  Comments.belongsTo(Cases);
  Comments.belongsTo(StaffMembers, {
    foreignKey: "creatorId",
  });
};

module.exports = { init, associations };
