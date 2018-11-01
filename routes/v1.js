const express 			= require('express');
const router 			= express.Router();

//User Controllers
const UserController 	= require('./../controllers/UserController');
const UserInfoController 	= require('./../controllers/UserInfoController');
const UserBankController 	= require('./../controllers/UserBankController');
const BeneficiaryController 	= require('./../controllers/BeneficiaryController');
const HomeController 	= require('./../controllers/HomeController');
const PolicyController 	= require('./../controllers/PolicyController');
const TransactionController 	= require('./../controllers/TransactionsController');

//Admin Contollers
const StaffController 	= require('./../controllers/Admin/StaffController');
const UserAController 	= require('./../controllers/Admin/UserController');
const PolicyAController 	= require('./../controllers/Admin/PolicyController');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users/create',    UserController.create);                                                 
router.get(     '/users/get',       passport.authenticate('jwt', {session:false}),UserController.get);        
router.put(     '/users/update',    passport.authenticate('jwt', {session:false}), UserController.update);     
router.post(    '/users/login',     UserController.login);

router.post(    '/user_info/create',       passport.authenticate('jwt', {session:false}), UserInfoController.create);  
router.get(     '/user_info/get',       passport.authenticate('jwt', {session:false}), UserInfoController.get);        
router.put(     '/user_info/update',       passport.authenticate('jwt', {session:false}), UserInfoController.update);  

router.post(    '/user_bank/create',       passport.authenticate('jwt', {session:false}), UserBankController.create);  
router.get(     '/user_bank/get',       passport.authenticate('jwt', {session:false}), UserBankController.get);        
router.put(     '/user_bank/update',       passport.authenticate('jwt', {session:false}), UserBankController.update);  

router.post(    '/user_beneficiary/create',       passport.authenticate('jwt', {session:false}), BeneficiaryController.create); 
router.get(     '/user_beneficiary/get',       passport.authenticate('jwt', {session:false}), BeneficiaryController.get);       
router.put(     '/user_beneficiary/update',       passport.authenticate('jwt', {session:false}), BeneficiaryController.update);

router.post(    '/user_kin/create',       passport.authenticate('jwt', {session:false}), UserInfoController.createKin); 
router.get(     '/user_kin/get',       passport.authenticate('jwt', {session:false}), UserInfoController.getKin);       
router.put(     '/user_kin/update',       passport.authenticate('jwt', {session:false}), UserInfoController.updateKin);

router.post(    '/user_transaction/create',       passport.authenticate('jwt', {session:false}), TransactionController.create); 
router.get(     '/user_transaction/get',       passport.authenticate('jwt', {session:false}), TransactionController.get);  
router.post(    '/user_transaction/mpesa_callback',       TransactionController.mpesa_callback); 
router.post(    '/user_transaction/mpesa_c2bvalidation',        TransactionController.mpesa_c2bvalidation); 
//router.get(    '/user_transaction/mpesa_callback',       passport.authenticate('jwt', {session:false}), TransactionController.mpesa_callbackG); 

router.get(     '/policy_years',       passport.authenticate('jwt', {session:false}), PolicyController.get);    
router.post(     '/user/create_policy',       passport.authenticate('jwt', {session:false}), PolicyController.create_policy);    
router.post(     '/user/policy_withdrawal_request',       passport.authenticate('jwt', {session:false}), PolicyController.policy_withdrawal_request);    

router.post(    '/admin/staff/create',       passport.authenticate('jwt', {session:false}), StaffController.create);  
router.get(     '/admin/staff/get_staff',       passport.authenticate('jwt', {session:false}), StaffController.get_staff);  
router.get(     '/admin/staff/get_staffs',       passport.authenticate('jwt', {session:false}), StaffController.get_all_staff);  
router.get(     '/admin/staff/get_staff_info/:staff_id',       passport.authenticate('jwt', {session:false}), StaffController.get_staff_info);  
router.put(     '/admin/staff/update/:staff_id',       passport.authenticate('jwt', {session:false}), StaffController.update);  

router.get(     '/admin/user/get_users',       passport.authenticate('jwt', {session:false}), UserAController.get_all_users);
router.get(     '/admin/user/get_user_info/:user_id',       passport.authenticate('jwt', {session:false}), UserAController.get_user_info);  
router.get(     '/admin/get_all_policies',       passport.authenticate('jwt', {session:false}), PolicyController.getUserPolicies);  
router.post(   '/admin/user/withdrawal_response/:user_id',       passport.authenticate('jwt', {session:false}), UserAController.withdrawal_response);  

router.get(     '/admin/get_transactions',       passport.authenticate('jwt', {session:false}), PolicyAController.all_transactions);
router.get(     '/admin/get_maturity',       passport.authenticate('jwt', {session:false}), PolicyAController.all_maturity);
router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)

//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
