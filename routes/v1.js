const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const UserInfoController 	= require('./../controllers/UserInfoController');
const HomeController 	= require('./../controllers/HomeController');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users/create',    UserController.create);                                                 
router.get(     '/users/get',       passport.authenticate('jwt', {session:false}), UserController.get);        
router.put(     '/users/update',    passport.authenticate('jwt', {session:false}), UserController.update);     
router.post(    '/users/login',     UserController.login);

router.post(     '/user_info/create',       passport.authenticate('jwt', {session:false}), UserInfoController.create);  
router.get(     '/user_info/get',       passport.authenticate('jwt', {session:false}), UserInfoController.get);        
router.post(     '/user_info/update',       passport.authenticate('jwt', {session:false}), UserInfoController.update);        

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)

//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
