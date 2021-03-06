'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const Password          = require('./').passwords;
const db     = require('./index');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('users', {
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
    });

    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
            //Password.create({password:hash})
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
    // Model.prototype.comparePassword = async function (user) {
    //     console.log(user);
    //     //console.log(getPass(user.email));
    //     getId(user.email).then(function(result){
    //         console.log(result);
    //      });
        
    // }

    // function getId(email_address) {
    //     return Model.findOne({
    //       where: {
    //         email: email_address
    //       },
    //       include: [
    //         {
    //             model: db.passwords
    //         }]
    //     });
    //  }

    //  function getPass(email) {
    //     getId(email).then(function(result){
    //         return Password.findOne({
    //             where: {
    //               userId: result.id
    //             }
    //           });
    //      });
        
    //  }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};