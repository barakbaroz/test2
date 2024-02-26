const { DataTypes } = require("sequelize");

const init = (sequelize) =>
  sequelize.define(
    "Comments",
    {
      CaseId: { type: DataTypes.UUID, primaryKey: true },
      text: DataTypes.STRING,
    },
    { underscored: true }
  );

const associations = (sequelize) => {
  const { Cases, Comments } = sequelize.models;
  Comments.belongsTo(Cases, { onDelete: "CASCADE" });
};

module.exports = { init, associations };
