'use strict';
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('roles', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
          },
        name     : DataTypes.STRING,
        description    : DataTypes.STRING
    });

    // Model.associate = function(models){
    //     this.staffs = this.belongsToMany(models.staffs, {through: 'staff_roles',foreignKey: 'roleId'});
    // };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};