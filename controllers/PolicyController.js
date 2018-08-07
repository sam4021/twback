const Policies         = require('../models').policies;
const UserPolicy         = require('../models').user_policy;
const WithdrawalRequest         = require('../models').user_policy_withdrawal_request;
const WithdrawalResponse         = require('../models').user_policy_withdrawal_response;
const db     = require('../models/index');

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, policy;
    [err, policy] = await to(Policies.findAll({
        attributes: ['id','policy_name']
    }));    
    if(err) TE(err.message);

    return ReS(res, {policy:policy});
}
module.exports.get = get;
 
const create_policy = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err ;
    const body = req.body; 
    let user = req.user;
    body['userId'] = user.id;

    [err, policy] = await to(UserPolicy.create(body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Added Policy.', user:policy.toWeb()}, 201);
    
}
module.exports.create_policy = create_policy;

const getUserPolicies = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, policy;
    [err, policy] = await to(UserPolicy.findAll({
        include: [
            {
              model: db.users,
              attributes: { exclude: ['password'] }
            },
            {
                model: db.policies
            }
          ]
    }));    
    if(err) TE(err.message);

    return ReS(res, {policy:policy});
}
module.exports.getUserPolicies = getUserPolicies;

const policy_withdrawal_request = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err ;
    const body = req.body; 

    [err, policy] = await to(WithdrawalRequest.create(body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Policy Withdrawal Accepted.', withdrawal:policy.toWeb()}, 201);
    
}
module.exports.policy_withdrawal_request = policy_withdrawal_request;