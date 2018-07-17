'use strict';
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('beneficiary', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
          first     : DataTypes.STRING,
          middle    : DataTypes.STRING,
          last      : DataTypes.STRING,
          relation  : DataTypes.STRING,
          id_number : {type: DataTypes.STRING, unique: true },
          email     : {type: DataTypes.STRING, unique: true, validate: { isEmail: {msg: "Phone number invalid."} }},
          phone     : {type: DataTypes.STRING, unique: true, validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."}, isNumeric: { msg: "not a valid phone number."} }},
    });

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};