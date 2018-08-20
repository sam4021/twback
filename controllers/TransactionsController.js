const Transactions          = require('../models').transactions; 
const User          = require('../models').user;
const UserPolicy   = require('../models').user_policy;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, transact,val;
    const user_info = req.body;
    let user_id = req.user.id;
    user_info['userId']= user_id;

    [err, transact] = await to(Transactions.create(user_info));
    if(err) return ReE(res, err, 422);
    UserPolicy.findById(req.body.userPolicyId)
      .then(u => {
          val = Number(u.paid_premium) + Number(req.body.amount_paid)
        u.updateAttributes({paid_premium:val});
      });

    return ReS(res, {message:'Successfully Added Transaction.', user:transact.toWeb()}, 201);
} 
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err;

    UserPolicy.findAll({ where: { userId: user.id } }).then(policy => {
            // if(err) return ReE(res, err, 422);    
            // return ReS(res, {user:policy});
            console.log(policy);
            
            Transactions.findAll({ where: { userPolicyId: policy.id } }).then(policy => {
                if(err) return ReE(res, err, 422);    
                return ReS(res, {user:policy});
            }); 
        });    
}
module.exports.get = get;
