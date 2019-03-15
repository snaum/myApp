/*
NOTES:
userDAO is a SINGLETON!! the module.exports is the instance of the class.

TODO: 
UserDAO should only do CRUD and should map between User es6class and mongoose User object

*/



const logger = require('../../helpers/logHelper');

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = require('./user');

const userSchema = new Schema(User.getSchema());
//schema.loadClass(User);

class UserDao{

    constructor(){
        this.users = mongoose.model('User', userSchema);
      //this.other = mongoose.model('other', otherSchema);
        this.test="test";

    }

    //TODO validate before save.
    create(userObj){
        //create new 
        var self = this;

        
        var p = new Promise(function(resolve, reject){
            try{
                var user = new User(
                    userObj.email,
                    userObj.passwordHash, 
                    userObj.firstname, 
                    userObj.lastname, 
                    userObj.screenname, 
                    userObj.language, 
                    userObj.phone
                );

                self.users.create(user, function(err, newUser){
                    if(err){
                        logger.error("error while saving to DB:"+err);
                        reject(err);
                    }else{
                        user.setId(newUser.id);
                        resolve(user);
                    }
                });
            } catch(err){
                logger.error("invalid user:"+err);
                reject(err);
            }
        });
        return p;
    }

    read(email, cb){
        //get user by email
        //this.users.findOne({ email: email }, cb);
        this.users.findOne({ email: email }, function(err, user){
            if(err){
                cb(err);
            }
            if (!user) {
                cb(null, false, { message: 'Incorrect email.' });
            }else{
                let u = new User(user.email, user.passwordHash, user.firstname, user.lastname, user.screename, user.language, user.phone);
                u.setId(user.id);
                cb(null, u);
            }
        });
    }

    readById(id, cb){
        //get user by id
        this.users.findById(id, function(err, user){
            if(err){
                cb(err);
            }
            let u = new User(user.email, user.passwordHash, user.firstname, user.lastname, user.screename, user.language, user.phone);
            u.setId(user.id);
            cb(null, u);
        });
    }

    list(cb){
        //list all users
    }

    update(id, user, cb){
        //update user with given details by included id
    }

    delete(id, cb){
        return this.users.deleteOne({ username: id }, cb);
        //delete the user by given id
    }

    
    /*
    getUserByEmail(email){
         this.users.findOne({ 'email': email }, 'email username password firstname lastname language phone', function (err, user) {
            if (err) return handleError(err);
            // Prints "Space Ghost is a talk show host".
            console.log('em=%s un=%s pw=%s fn=%s ln=%s lg=%s ph=%s', user.email, user.username, user.password, user.firstname, user.lastname, user.language, user.phone);
        });
    }

    register_old(email, username, password, firstname, lastname, language, phone){
        this.users.create({
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            language: language,
            email: email,
            phone: phone
        });
    }

    register(user){
        console.log("saving..."+JSON.stringify(user));
        this.users.create(user,function (err, user) {
            if (err) {
                logger.error(err);
                throw (err);
            }
            else{
                console.log("saved:"+JSON.stringify(user));
            }
         } );
    }

    
    authenticate(username, password, done){
        this.users.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
    */
}

module.exports = new UserDao();