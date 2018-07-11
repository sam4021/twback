const UserInfo          = require('../models').user_info;
const User          = require('../models').user;
const authService   = require('./../services/AuthService');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    //let err, user;
    const user_info = req.body;
    let user = req.user;
    let user_id = req.user.id;
    user_info['userId']= user_id;

    [err, userInfo] = await to(UserInfo.create(user_info));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Added User Details.', user:userInfo.toWeb(), token:userInfo.getJWT()}, 201);
} 
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err;

        UserInfo.findOne({ where: { userId: user.id } }).then(user_info => {
            console.log(user_info);
            if(err) return ReE(res, err, 422);    
            return ReS(res, {user:user_info});
        });    
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    //user.set(data);

    console.log(user);
    

    // [err, user] = await to(user.save());
    // if(err){
    //     if(err.message=='Validation error') err = 'The email address or phone number is already in use';
    //     return ReE(res, err);
    // }
    // return ReS(res, {message :'Updated User: '+user.email});
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
    let err, user;

    [err, user] = await to(authService.authUser(body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;