const Transactions          = require('../models').transactions; 
const User          = require('../models').user;
const UserPolicy   = require('../models').user_policy;
const MpesaCallback = require('../models').mpesa_callback;

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

const mpesa_callback = async function(req, res){
    // res.setHeader('Content-Type', 'application/json');
    // let err, callback;
    // const user_info = req.body;
    console.log(res);

    // [err, callback] = await to(MpesaCallback.create(user_info));
    // if(err) return ReE(res, err, 422);

    // return ReS(res, {message:'Successfully Added Transaction.', user:callback.toWeb()}, 201);
} 
module.exports.mpesa_callback = mpesa_callback;

const mpesa_c2bvalidation = async function(req, res){
    //app.post('/validation', function(req, res) {
        console.log('-----------C2B VALIDATION REQUEST-----------');
        console.log(prettyjson.render(req.body, options));
        console.log('-----------------------');
      
        var message = {
          "ResultCode": 0,
          "ResultDesc": "Success",
          "ThirdPartyTransID": "1234567890"
        };
      
        res.json(message);
      //});
} 
module.exports.mpesa_c2bvalidation = mpesa_c2bvalidation;