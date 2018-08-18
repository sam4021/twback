const Policies         = require('../models').policies;
const UserPolicy         = require('../models').user_policy;
const WithdrawalRequest         = require('../models').user_policy_withdrawal_request;
const WithdrawalResponse         = require('../models').user_policy_withdrawal_response;
const db     = require('../models/index');
const date = new Date();
const moment = require('moment');

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
    let day, month, year;
    //day = date.getDay();
    day = moment().format('D'); 
    //month = date.getMonth();
    month  = moment().format('M'); 
    //year = date.getFullYear();
    year = moment().format('YYYY'); 
    const body = req.body; 
    let user = req.user;
    body['userId'] = user.id;
    var currentDate = moment();
    body['inception_date'] = moment().format('DD-MM-YYYY');
     
    Policies.findById(body['policyId'])
    .then(async p => {
        let newYear = Number(year)+Number(p.years);
        
        var futureYear = moment(currentDate).add(newYear, 'Y');
        //var futureYearEnd = moment(futureYear).endOf('year');
        body['maturity_date'] = futureYear.format('DD-MM-YYYY')
        // moment().add(newYear, 'YYYY').format('DD-MM-YYYY');
        //day+'-'+month+'-'+ newYear;
       [err, policy] = await to(UserPolicy.create(body));

        return ReS(res, {message:'Successfully Added Policy.', user:policy.toWeb()}, 201);
      });    
    
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