require('../config/config');
const User          = require('../models').users;
const authService   = require('./../services/AuthService');
const validator     = require('validator');
const StaffRole     = require('../models').staff_roles;
const db     = require('../models/index');
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
        transporter.sendMail({
            from: 'samson@geminia.co.ke',
            to: "samsonwandah@gmail.com",
            subject: 'hello',
            html: 'hello world!'
        });
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    [err, userInfo] = await to(User.findById(req.user.id,{attributes: { exclude: ['password'] },
                 include: [
                    {
                        model: db.user_info
                    },
                    {
                        model: db.beneficiary,
                    },
                    // {
                    //     model:db.user_bank
                    // },
                    {
                        model: db.user_policy,
                        include:[
                            {
                                model: db.policies
                            }
                        ]
                    }
                   ]
            }));
    return ReS(res, {user:userInfo.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;

const login = async function(req, res){
    const body = req.body;
    let err, user, staff;

    var email = body.email;
    var domain = email.substring(email.lastIndexOf("@") +1);

    if(validator.isEmail(email) && domain==CONFIG.staff_email){ 
        [err, staff] = await to(authService.authStaff(body));
        if(err) return ReE(res, err, 422);        
        return ReS(res, {token:staff.getJWT(), user:staff.toWeb(),admin:true});
    } else{
        [err, user] = await to(authService.authUser(body));
        if(err) return ReE(res, err, 422);

        return ReS(res, {token:user.getJWT(), user:user.toWeb(),admin:false});
    }
}
module.exports.login = login;