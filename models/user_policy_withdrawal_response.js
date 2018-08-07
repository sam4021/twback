'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('user_policy_withdrawal_response', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
          status : DataTypes.STRING,
          amount  : DataTypes.FLOAT,
          mode_of_pay  : DataTypes.STRING,
          transaction_id  : DataTypes.STRING
    });

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};