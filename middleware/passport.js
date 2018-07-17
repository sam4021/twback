const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models').users;
const Staff = require('../models').staffs;
const StaffRoles = require('../models').staff_roles;
const Roles = require('../models').roles;

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
        let err, user;//console.log("Payload::::"+jwt_payload);
        console.log(jwt_payload);
        var result = Object.keys(jwt_payload); 
        if (result[0] == 'staff_id') {
            [err, user] = await to(Staff.findById(jwt_payload.staff_id,{include: [
                {
                  model: StaffRoles,
                  include: [
                    {
                      model: Roles
                    }
                  ]
                }
              ]}));
        } else {
            [err, user] = await to(User.findById(jwt_payload.user_id));
        }

        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
}