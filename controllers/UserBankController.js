const UserBank          = require('../models').user_bank;
const User          = require('../models').user;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    //let err, user;
    const user_info = req.body;
    let user = req.user;
    let user_id = req.user.id;
    user_info['userId']= user_id;

    [err, userInfo] = await to(UserBank.create(user_info));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Added User Bank Details.', user:userInfo.toWeb(), token:userInfo.getJWT()}, 201);
} 
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err;

        UserBank.findOne({ where: { userId: user.id } }).then(user_info => {
            if(err) return ReE(res, err, 422);    
            return ReS(res, {user:user_info});
        });    
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    
    UserBank.findOne({  
        userId: user.id
      })
      .then(u => {
        u.updateAttributes(data);
        return ReS(res, {message :"User Bank Info Update "});
      });
}
module.exports.update = update;