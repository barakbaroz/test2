const { DataTypes } = require("sequelize");

const init = (sequilize) =>
  sequilize.define(
    "HeartFailures",
    {
      caseId: { primaryKey: true, type: DataTypes.UUID },
      heartConditions: DataTypes.ARRAY(
        DataTypes.ENUM(
          "aortic_valve_regurgitation",
          "aortic_valve_stenosis",
          "atherosclerosis",
          "cardiac_arrhythmia",
          "cardiomyopathy",
          "general",
          "mitral_valve_regurgitation",
          "mitral_valve_stenosis",
          "myocardial_infarction"
        )
      ),
      symptoms: DataTypes.ARRAY(
        DataTypes.ENUM("shortness_of_breath", "edema", "chest_pain")
      ),
    },
    { underscored: true }
  );
const associations = (sequelize) => {
  const { Cases, HeartFailures } = sequelize.models;
  HeartFailures.belongsTo(Cases);
};

module.exports = { init, associations };
