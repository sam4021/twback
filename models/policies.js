'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('policy', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        policy_name     : DataTypes.STRING,
        years : DataTypes.INTEGER
    });

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};