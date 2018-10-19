var mongoose = require('mongoose');
var Order = require('./models/orders');
var Metadata = require('./models/metadata');
var User = require('./models/user');


var connectionUrl = "mongodb+srv://Snixells:qouH6xQdnPt6Nsbd@cluster0-8j2qj.mongodb.net/krueger";

mongoose.connect(connectionUrl);

// // ORDERS
// var order = new Order({
//     date: new Date("July 21, 1983 01:15:00"),
//     userID: 123,
//     orderID: 1234,
//     positions: 3,
//     price: 123,
//     paymentMethod: "Paypal",

//     configuration: {
//         shoelace: "gruen",
//         pattern: "karo",
//         seam: "blau",
//         print: "diamant"
//     }
// })

// var orderPromise = order.save();

// orderPromise.then(() => {
//     mongoose.disconnect();
// });

// mongoose.connect(connectionUrl);

// // Metadata
// var metadata = new Metadata({
//     loginsThisDay: 2,
//     date: new Date("July 21, 1983 01:15:00"),
//     configuration: {
//         shoelace: {
//             white: 1,
//             pink: 0,
//             grey: 1,
//             blue: 4
//         },
//         seam: {
//             white: 1,
//             red: 3,
//             green: 5,
//             blue: 1,
//         },
//         pattern: {
//             nothing: 3,
//             zickZack: 2,
//             diamong: 3,
//         },
//         print: {
//             nothing: 1,
//             flames: 10,
//             music: 2,
//             planets: 13,
//         }
//     }
// })


// var metadataPromise = metadata.save();

// metadataPromise.then(() => {
//     mongoose.disconnect();
// });

// USERS
// var user = new User({
//     username: "admin", 
//     password: "admin",
//     email: "admin@krueger-webshop.com", 
//     id: 1, 
//     forename: "Admin", 
//     surname: "Krueger",
//     adress: {
//         street: "Adminstraße", 
//         streetnumber: "42", 
//         postcode: 12345,
//         location: "Adminhausen"
//     },
//     birthdate: new Date("July 21, 1971"),
//     phoneNumber: 3213211244
// })

// var userPromise = user.save();

// userPromise.then(() => {
//     mongoose.disconnect();
// });