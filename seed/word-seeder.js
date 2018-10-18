var Word = require('../models/word');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/words');

var word = {

}

var words = [
    new Word({
        wordString: 'FirstWordEver',
        count: 3,
        subwords: [
            {
                subwordString: "firstSubword",
                subwordCounts: 3
            }, {
                subwordString: "secondSubword",
                subwordCounts: 7
            }
        ]
    }),
    // new Word({
    //     wordString: 'SecondWordEver',
    //     count: 3,
    //     subwordsStrings: ["FirstrSubword", "SecondSubword"],
    //     subwordsCounts: [3, 7]
    // })
]

var done = 0;

for (var i = 0; i < words.length; i++) {
    words[i].save((err, result) => {
        done++;
        if (done === words.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}