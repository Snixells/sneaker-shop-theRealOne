var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orders = new Schema({ 
    date: Date, 
    userID: Number,
    orderID:Number,
    positions: Number,
    price: Number, 
    paymentMethod: String, 
    
    configuration: {
        shoelace: String,
        pattern: String,
        seam: String,
        print: String
    }
})

module.exports = mongoose.model('UserSchema', orders);

