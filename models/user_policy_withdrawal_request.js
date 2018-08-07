'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('user_policy_withdrawal_request', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
          amount  : DataTypes.FLOAT
    });

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};