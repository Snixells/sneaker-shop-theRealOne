var mongoose = require('mongoose');
var Order = require('./models/orders');

mongoose.connect("mongodb://localhost:27017/analytics");


var order = new Order({
    date: new Date("July 21, 1983 01:15:00"),
    userID: 123,
    orderID: 1234,
    positions: 3,
    price: 123,
    paymentMethod : "Paypal",

    configuration: {
        shoelace: "gruen",
        pattern: "karo",
        seam: "blau",
        print: "diamant"
    }
})

var savePromise = order.save();

savePromise.then(() => {
    mongoose.disconnect();
});