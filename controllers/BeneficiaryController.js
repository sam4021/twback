const Beneficiary          = require('../models').beneficiary;
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

        // UserInfo.findOne({ where: { userId: user.id } }).then(user_info => {
        //     if(err) return ReE(res, err, 422);    
        //     return ReS(res, {user:user_info});
        // });  
        [err, userb] = await to(Beneficiary.create(body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Added User Beneficiary.', user:userb.toWeb()}, 201);
        // Beneficiary.findOne({  
        //     userId: user.id
        //   })
        //   .then(u => {
        //     console.log(u);
        //   });  
}
module.exports.get = get;

