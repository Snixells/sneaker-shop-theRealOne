var mongoose = require('mongoose');
var Order = require('./models/orders');

mongoose.connect("mongodb://localhost:27017/analytics");


var order = new Order({
    date: this.date(),
    userID: 123, 
    orderID: 1234, 
    positions: 3,
    price: 123,
    paymentMethod = "Paypal",

    configuration: {
        shoelace: "gruen",
        pattern: "karo",
        seam: "blau",
        print: "diamant"
    }
})

order.save(() =>  {
    
})