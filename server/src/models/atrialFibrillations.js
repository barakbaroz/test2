const { DataTypes } = require("sequelize");

const init = (sequilize) =>
  sequilize.define(
    "AtrialFibrillations",
    {
      CaseId: { primaryKey: true, type: DataTypes.UUID },
      patientType: DataTypes.ENUM("ambulatory", "hospitalized"),
      medicine: DataTypes.JSONB,
      patientSeniority: DataTypes.ENUM("new", "regularly", "changedMedicine"),
    },
    { underscored: true }
  );
const associations = (sequelize) => {
  const { Cases, AtrialFibrillations } = sequelize.models;
  AtrialFibrillations.belongsTo(Cases);
};

module.exports = { init, associations };
