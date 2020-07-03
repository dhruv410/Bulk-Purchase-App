const mongoose = require('mongoose');

let User = new mongoose.Schema({
	    firstName: {
	        type: String
	    },
	    lastName: {
	        type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
		}
	},
);

module.exports = mongoose.model('User', User);