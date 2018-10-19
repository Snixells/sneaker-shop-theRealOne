var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
    username: String, 
    password: String,
    email: String, 
    userID: Number, 
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

})

module.exports = mongoose.model('UserSchema', user);

