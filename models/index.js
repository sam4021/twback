'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var db        = {};

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  operatorsAliases: false
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Models/tables
db.users = require('./user.js')(sequelize, Sequelize); 
db.user_info = require('./user_info.js')(sequelize, Sequelize);  
db.user_bank = require('./user_bank.js')(sequelize, Sequelize);
db.user_policy = require('./user_policy.js')(sequelize, Sequelize);
db.user_policy_withdrawal_request = require('./user_policy_withdrawal_request.js')(sequelize, Sequelize);
db.user_policy_withdrawal_response = require('./user_policy_withdrawal_response.js')(sequelize, Sequelize);
db.user_beneficiary = require('./user_beneficiary')(sequelize, Sequelize);
db.user_kin = require('./user_kin')(sequelize, Sequelize);
db.notifications = require('./notifications.js')(sequelize, Sequelize);
db.passwords = require('./user_password.js')(sequelize, Sequelize);
db.policies = require('./policies.js')(sequelize, Sequelize);
db.transactions = require('./transactions.js')(sequelize, Sequelize);
db.staffs = require('./staff.js')(sequelize, Sequelize);
db.staff_roles = require('./staff_roles.js')(sequelize, Sequelize);
db.roles = require('./roles.js')(sequelize, Sequelize);

//Relations  
db.users.hasMany(db.passwords);
db.users.hasOne(db.user_info); 
db.users.hasMany(db.user_policy); 
db.users.hasOne(db.user_beneficiary); 
db.users.hasOne(db.user_kin);
db.users.hasOne(db.user_bank); 
db.users.hasMany(db.notifications);  
db.policies.hasMany(db.user_policy);
db.user_policy.belongsTo(db.policies);
db.user_policy.hasOne(db.user_policy_withdrawal_request);
db.user_policy.hasOne(db.user_policy_withdrawal_response);
db.user_policy_withdrawal_request.belongsTo(db.user_policy);
db.user_policy_withdrawal_response.belongsTo(db.user_policy);
db.user_policy.belongsTo(db.users);
db.user_policy.hasMany(db.transactions);
db.transactions.belongsTo(db.user_policy);
db.passwords.belongsTo(db.users);
db.user_bank.belongsTo(db.users);
db.user_beneficiary.belongsTo(db.users); 
db.user_kin.belongsTo(db.users);
db.staffs.hasMany(db.staff_roles); 
db.staffs.hasOne(db.user_policy_withdrawal_response);
db.roles.hasMany(db.staff_roles);
db.staff_roles.belongsTo(db.staffs);
db.staff_roles.belongsTo(db.roles);

module.exports = db;
