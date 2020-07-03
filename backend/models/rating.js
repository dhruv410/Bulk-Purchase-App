const mongoose = require('mongoose');

let Rating = new mongoose.Schema({
        vendor: {
            type: String
        },
        rate: [Number],
        review: [String]
	},
);

module.exports = mongoose.model('Rating', Rating);