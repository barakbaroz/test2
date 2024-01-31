const { DataTypes } = require("sequelize");

const init = (sequilize) =>
  sequilize.define(
    "AtrialFibrillations",
    {
      caseId: { primaryKey: true, type: DataTypes.UUID },
      patientType: DataTypes.ENUM("ambulatory", "hospitalized"),
      medicineType: DataTypes.ENUM("eliquis", "pradaxa", "xarelto"),
      patientSeniority: DataTypes.ENUM("new", "regularly", "changedMedicine"),
      drugDosage: DataTypes.ENUM("2.5ml", "5ml"),
    },
    { underscored: true }
  );
const associations = (sequelize) => {
  const { Cases, AtrialFibrillations } = sequelize.models;
  AtrialFibrillations.belongsTo(Cases);
};

module.exports = { init, associations };
