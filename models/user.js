var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var user = new Schema({
    username: String, 
    password: String,
    email: String, 
    id: Number, 
    forename: String, 
    surname: String,
    adress: {
        street: String, 
        streetnumber: String, 
        postcode: Number,
        location: String
    },
    birthdate: Date,
    titel: String, 
    phoneNumber: Number
});
user.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
user.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('UserSchema', user);

