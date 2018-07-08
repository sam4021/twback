const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');

const passport      	= require('passport');

require('./../middleware/passport')(passport)

//  router.post('/create', function(req, res, next){
//     res.send("test");
// });

router.post(    '/create',           UserController.create);                                                 // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);

module.exports = router;