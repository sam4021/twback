'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('policy', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        policy_name     : DataTypes.STRING
    });

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};