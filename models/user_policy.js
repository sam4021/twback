'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('user_policies', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
          inception_date : DataTypes.DATE,
          maturity_date  : DataTypes.DATE,
          actual_premium : DataTypes.INTEGER,
          paid_premium : {type: DataTypes.INTEGER, defaultValue: 0},
          policy_number: DataTypes.STRING,
          policy_name : DataTypes.STRING

    });

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};