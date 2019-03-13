const userDao = require("../components/users/userDao");


function authenticate(email, password, done){

    userDao.read(email, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!validatePassword(user, password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}

function register(user){
    console.log("saving..."+JSON.stringify(user));
    var p = new Promise(function(resolve, reject){
        userDao.create(user).then(function(result){
            console.log("saved:"+JSON.stringify(result));
            resolve(result);
        }, function(err){
            console.error(err);
            resolve(err);
        });
    
    });
    return p;
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

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        // req.user is available for use here
        return next(); 
    }
    //TODO set error message
    // denied. redirect to login
    res.redirect('/logout')
}

module.exports = {
    authenticate: authenticate,
    register: register,
    validatePassword: validatePassword,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser,
    ensureAuthenticated: ensureAuthenticated
}