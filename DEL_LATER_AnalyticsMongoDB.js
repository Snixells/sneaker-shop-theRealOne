var mongoose = require('mongoose');
var Order = require('./models/orders');
var Metadata = require('./models/metadata');

var connectionUrl = "mongodb://localhost:27017/analytics";

mongoose.connect(connectionUrl);

// ORDERS
var order = new Order({
    date: new Date("July 21, 1983 01:15:00"),
    userID: 123,
    orderID: 1234,
    positions: 3,
    price: 123,
    paymentMethod: "Paypal",

    configuration: {
        shoelace: "gruen",
        pattern: "karo",
        seam: "blau",
        print: "diamant"
    }
})

var orderPromise = order.save();

orderPromise.then(() => {
    mongoose.disconnect();
});


mongoose.connect(connectionUrl);

// Metadata
var metadata = new Metadata({
    loginsThisDay: 2,
    date: new Date("July 21, 1983 01:15:00"),
    configuration: {
        shoelace: {
            white: 1,
            pink: 0,
            grey: 1,
            blue: 4
        },
        seam: {
            white: 1,
            red: 3,
            green: 5,
            blue: 1,
        },
        pattern: {
            nothing: 3,
            zickZack: 2,
            diamong: 3,
        },
        print: {
            nothing: 1,
            flames: 10,
            music: 2,
            planets: 13,
        }
    }
})


var metadataPromise = metadata.save();

metadataPromise.then(() => {
    mongoose.disconnect();
});