const userDao = require("../components/users/userDao");
const logger = require('./logHelper');

const crypto = require('crypto');

const SALT_LENGTH_BYTES = 64;


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


function register(userObj){
    logger.debug("saving..."+JSON.stringify(userObj));
    var p = new Promise(function(resolve, reject){
        userDao.create(userObj).then(function(newUser){
            logger.debug("saved:"+JSON.stringify(newUser));
            resolve(newUser);
        }, function(err){
            logger.error("error: "+err);
            let e = {
                message: err
            }
            reject(e);
        });
    
    });
    return p;
}
function validatePassword(user, password){
    let salt =  user.passwordHash.substring(0,SALT_LENGTH_BYTES*2);
    const hash = crypto.createHash('sha512');
    hash.update(salt+password);
    let testHash = hash.digest('hex');
    testHash = salt + testHash;
    
    return user.passwordHash === testHash;
}

function passwordHasher(password){
    let salt = crypto.randomBytes(SALT_LENGTH_BYTES);
    salt = salt.toString('hex');
    const hash = crypto.createHash('sha512');
    hash.update(salt+password);
    let passwordHash = hash.digest('hex');
    passwordHash = salt + passwordHash;
    return passwordHash;
}

/*
function serializeUser(user, done){
    console.log("...serializeUser...");
    done(null, user.getId());
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
*/



module.exports = {
    authenticate: authenticate,
    register: register,
    validatePassword: validatePassword,
    //serializeUser: serializeUser,
   // deserializeUser: deserializeUser,
    //ensureAuthenticated: ensureAuthenticated,
    passwordHasher: passwordHasher
}