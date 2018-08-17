const Beneficiary          = require('../models').user_beneficiary;
const User          = require('../models').user;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let user_id = req.user.id;
    body['userId']= user_id;

    [err, userb] = await to(Beneficiary.create(body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Added User Beneficiary.', user:userb.toWeb()}, 201);
} 
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err;
 
    [err, userb] = await to(Beneficiary.findOne({userId:user.id}));
    if(err) return ReE(res, err, 422);

    return ReS(res, {user:userb.toWeb()}, 201);

}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    
    Beneficiary.findOne({  
        userId: user.id
      })
      .then(u => {
        u.updateAttributes(data);
        return ReS(res, {message :"User Beneficiary Update "});
      });
}
module.exports.update = update;

