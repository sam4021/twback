'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('user_policy', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
          inception_date : DataTypes.DATE,
          maturity_date  : DataTypes.DATE,
          actual_premium : DataTypes.INTEGER
    });

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};