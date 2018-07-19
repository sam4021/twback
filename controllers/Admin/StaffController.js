const Staff         = require('../../models').staffs;
const authService   = require('./../../services/AuthService');
const db     = require('../../models/index');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err ;
    const body = req.body; 
    let user = req.user;
    body['staffId'] = user.id;   

    [err, staff] = await to(Staff.findOne({where:{email:user.email}}));
    if(err) TE(err.message);
    
    if(!body.unique_key && !body.email){
        return ReE(res, 'Please enter an email to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, staff;

        [err, staff] = await to(authService.createStaff(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new Staff.', staff:staff.toWeb(), token:staff.getJWT()}, 201);
    }
}
module.exports.create = create;

const get_staff = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user.toWeb()});
}
module.exports.get_staff = get_staff;

const get_staff_info = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    [err, staff] = await to(Staff.findById(req.params.staff_id,{attributes: { exclude: ['password'] },
                include: [
                    {
                      model: db.staff_roles,
                      include: [
                        {
                          model: db.roles
                        }
                      ]
                    }
                  ]
            }));

    return ReS(res, {staff:staff.toWeb()});
}
module.exports.get_staff_info = get_staff_info;

const get_all_staff = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    [err, staff] = await to(Staff.findAll({}));
    if(err) TE(err.message);

    return ReS(res, {staffs:staff});
}
module.exports.get_all_staff = get_all_staff;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;