// -- Private Functions -- //
//validator functions
let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validEmail(email){
    if ((typeof (email) !== 'string') || !emailRegExp.test(email)){
        throw 'invalid input';
    } 
}

class User{
    constructor(email, password){
        validEmail(email);

        this.email = email;
        this.password = password;
        this.firstname;
        this.lastname;
        this.screenname;
        this.language;
        this.phone;

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

}

module.exports = User;