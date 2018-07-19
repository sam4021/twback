const Policies         = require('../models').policies;
const UserPolicy         = require('../models').user_policy;
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

    [err, policy] = await to(UserPolicy.create(body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Added Policy.', user:policy.toWeb()}, 201);
    
}
module.exports.create_policy = create_policy;