/*
NOTES:
userDAO is a SINGLETON!! the module.exports is the instance of the class.

TODO: 
separate concerns. register and authenticate should be in a separate file and depend on userDao. 
UserDAO should only do CRUD and should map between User es6class and mongoose User object

*/




let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = require('./user');

const schema = new Schema(User.getSchema());
//schema.loadClass(User);

class UserDao{

    constructor(){
        this.users = mongoose.model('User', schema);
        this.test="test";
    }

    create(user, cb){
        //create new user
        this.users.create(user, cb);
    }

    read(username, cb){
        //get user by id
        this.users.findOne({ username: username }, cb);
    }

    readById(id, cb){
        //get user by id
        this.users.findById(id, cb);
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
                console.error(err);
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