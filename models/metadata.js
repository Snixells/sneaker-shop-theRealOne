var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var metadata = new Schema({
    loginsThisDay: Number,
    date:String,
    metadataorders:Boolean,
    configuration: {
        shoelace: {
            Weiß: Number,
            Rosa: Number,
            Grau: Number,
            Hellblau: Number
        },
        seam: {
            Weiß: Number,
            Rot: Number,
            Grün: Number,
            Blau: Number,
        },
        pattern: {
            Standard: Number,
            ZickZack: Number,
            Diamanten: Number,
        },
        print: {
            Standard: Number,
            Flammen: Number,
            Musik: Number,
            Planet: Number,
        }
    }
})

module.exports = mongoose.model('MetadataSchema', metadata);

