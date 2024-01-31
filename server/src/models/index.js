const Sequelize = require("sequelize");
const cases = require("./cases");
const users = require("./users");
const avatar = require("./avatar");
const userActions = require("./userActions");
const smsTracking = require("./smsTracking");
const smsQueue = require("./smsQueue");
const staffMembers = require("./staffMembers");
const comments = require("./comments");
const casesProgress = require("./casesProgress");
const heartFailures = require("./heartFailures");
const atrialFabrillations = require("./atrialFibrillations");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

//init
cases.init(sequelize);
users.init(sequelize);
avatar.init(sequelize);
userActions.init(sequelize);
smsTracking.init(sequelize);
smsQueue.init(sequelize);
staffMembers.init(sequelize);
comments.init(sequelize);
casesProgress.init(sequelize);
heartFailures.init(sequelize);
atrialFabrillations.init(sequelize);

//Associations
cases.associations(sequelize);
users.associations(sequelize);
avatar.associations(sequelize);
userActions.associations(sequelize);
smsTracking.associations(sequelize);
smsQueue.associations(sequelize);
staffMembers.associations(sequelize);
comments.associations(sequelize);
casesProgress.associations(sequelize);
heartFailures.associations(sequelize);
atrialFabrillations.associations(sequelize);

//Add Hooks
staffMembers.hooks(sequelize);
cases.hooks(sequelize);

module.exports = { sequelize, ...sequelize.models };
