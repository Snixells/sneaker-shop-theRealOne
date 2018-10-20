var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var metadata = new Schema({
    loginsThisDay: Number,
    date:String,
    configuration: {
        shoelace: {
            white: Number,
            pink: Number,
            grey: Number,
            blue: Number
        },
        seam: {
            white: Number,
            red: Number,
            green: Number,
            blue: Number,
        },
        pattern: {
            nothing: Number,
            zickZack: Number,
            diamong: Number,
        },
        print: {
            nothing: Number,
            flames: Number,
            music: Number,
            planets: Number,
        }
    }
})

module.exports = mongoose.model('MetadataSchema', metadata);

