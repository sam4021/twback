require('../../config/config');
const User          = require('../../models').users;
const authService   = require('./../../services/AuthService');
const validator     = require('validator');
const StaffRole     = require('../../models').staff_roles;
const db     = require('../../models/index');
// const transporter = require('../middleware/mailer');
var directTransport = require('nodemailer-direct-transport');
var nodemailer = require('nodemailer');
var options = {};
var transporter = nodemailer.createTransport(directTransport(options))

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;    
    
    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));
        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get_all_users = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    [err, user] = await to(User.findAll({
        attributes: ['first','middle','last','id_number', 'email','phone']
    }));    
    if(err) TE(err.message);

    return ReS(res, {user:user});
}
module.exports.get_all_users = get_all_users;

const get_user_info = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    [err, user] = await to(User.findAll({
        attributes: ['first','middle','last','id_number', 'email','phone'],
        include: [
            {
              model: db.user_info
            },
            {
                model: db.beneficiary
            }
          ]
    }));
    
    if(err) TE(err.message);

    return ReS(res, {user:user});
}
module.exports.get_user_info = get_user_info;