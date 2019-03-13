// -- Private Functions -- //
//validator functions
let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validEmail(email){
    if ((typeof (email) !== 'string') || !emailRegExp.test(email)){
        throw 'invalid input';
    } 
}

/*
factory method??

function createUser(email, password, firstname, lastname, screename, language, phone) {
    validateEmail(email)
    return {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        screename: screename,
        language: language,
        phone: phone
    }
}
*/

class User{
    constructor(id, email, password, firstname, lastname, screename, language, phone){
        validEmail(email);

        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.screenname = screename;
        this.language = language;
        this.phone = phone;

        this.private; //other private
    }

    static getSchema(){
        return {
            email: String,
            password: String,
            firstname: String,
            lastname: String,
            screenname: String,
            language: String,
            phone: Number
        }
    }

    getEmail(){
        return this.email;
    }

}

module.exports = User;