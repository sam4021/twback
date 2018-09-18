const Staff               = require('../../models').staffs;
const User                = require('../../models').users;
const Policies            = require('../../models').policies;
const UserPolicy          = require('../../models').user_policy;
const WithdrawalRequest   = require('../../models').user_policy_withdrawal_request;
const WithdrawalResponse  = require('../../models').user_policy_withdrawal_response;
const Transactions        = require('../../models').transactions;
const authService         = require('./../../services/AuthService');
const db                  = require('../../models/index');

const all_maturity = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    [err, policy] = await to(UserPolicy.findAll({
        order: [
            ['maturity_date', 'DESC']
        ],
        include: [
            {
                model: db.users,
                attributes: { exclude: ['password','id_number','phone'] }
            }
          ]
    }));
    if(err) TE(err.message);

    return ReS(res, {policy:policy});
}
module.exports.all_maturity = all_maturity;

const all_transactions = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    [err, transactions] = await to(Transactions.findAll({
    include: [
        {
            model: db.user_policy,
             include:[
                {
                    model: db.policies
                },
                {
                    model: db.users,
                    attributes: { exclude: ['password','id_number','phone'] }
                }
             ]
        }
      ]
}));
    if(err) TE(err.message);

    return ReS(res, {transactions:transactions});
}
module.exports.all_transactions = all_transactions;

