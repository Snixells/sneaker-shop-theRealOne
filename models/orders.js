var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var order = new Schema({
    date: String,
    user: {
        userID: "ObjectId",
        guest: {
            email: String,
            forename: String,
            surname: String,
            adress: {
                street: String,
                streetnumber: String,
                postcode: Number,
                location: String
            },
            birthdate: Date,
            phoneNumber: Number,
        }

    },
    price: Number,
    paymentMethod: String,

    configuration: {
        shoelace: String,
        pattern: String,
        seam: String,
        print: String
    }


})

module.exports = mongoose.model('OrderSchema', order);

