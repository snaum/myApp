const userDao = require("../components/users/userDao");
const logger = require('./logHelper');
const jwt = require("jsonwebtoken");

const jwtoptions = {
    algorithm: "HS256",
    expiresIn: "12h",
    mutatePayload: true
};

function authenticate(id, done){
    userDao.readById(id, function(err, user) {
        if (err) { 
            return done(err, false); 
        }
        if (!user) {
            return done(null, false, { message: 'invalid user.' });
        }
        return done(null, user);
    });
}

//TODO hash password before saving
function register(userObj){
    logger.debug("saving..."+JSON.stringify(userObj));
    var p = new Promise(function(resolve, reject){
        userDao.create(userObj).then(function(newUser){
            logger.debug("saved:"+JSON.stringify(newUser));
            resolve(newUser);
        }, function(err){
            logger.error(err);
            resolve(err);
        });
    
    });
    return p;
}
function createTokenAndPayload(user){
    let payload = {
        user:user.toJSON()
    }
    let token = jwt.sign(payload,'top_secret',jwtoptions);
    let decoded = jwt.decode(token, {complete: true});
    logger.debug(decoded.header);
    logger.debug(decoded.payload);
    return { 
        jwt: token,
        payload: decoded.payload
    };
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
*/


module.exports = {
    authenticate: authenticate,
    register: register,
    createToken: createTokenAndPayload
}