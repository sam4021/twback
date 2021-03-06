'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('staffs', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false 
          },
        first     : DataTypes.STRING,
        middle    : DataTypes.STRING,
        last      : DataTypes.STRING, 
        id_number : {type: DataTypes.STRING, unique: true },
        email     : {type: DataTypes.STRING, unique: true, validate: { isEmail: {msg: "Email is invalid."} }},
        phone     : {type: DataTypes.STRING, unique: true, validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."}, isNumeric: { msg: "not a valid phone number."} }},
        password  : DataTypes.STRING, 
        staffId     : DataTypes.STRING,
    });

    // Model.associate = function(models){
    //     this.roles = this.belongsToMany(models.roles, {through: 'staff_roles',foreignKey: 'staffId'});
    // };

    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({staff_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        console.log(json);
        
        return json;
    };

    return Model;
};