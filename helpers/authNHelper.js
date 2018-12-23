const userDao = require("../components/users/userDao");


function authenticate(username, password, done){

    userDao.read(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!validatePassword(user, password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}

function register(user){
    console.log("saving..."+JSON.stringify(user));
    userDao.create(user,function (err, user) {
        if (err) {
            console.error(err);
            throw (err);
        }
        else{
            console.log("saved:"+JSON.stringify(user));
        }
     } );
}
function validatePassword(user, password){
    //console.log("user="+JSON.stringify(user));
    //console.log("password="+password);
    return user.password === password;
}

function serializeUser(user, done){
    console.log("...serializeUser...");
    done(null, user.id);
}
function deserializeUser(id, done){
    console.log("...deserializeUser...");
    userDao.readById(id, function(err, user) {
        done(err, user);
    })
}


module.exports = {
    authenticate: authenticate,
    register: register,
    validatePassword: validatePassword,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
}