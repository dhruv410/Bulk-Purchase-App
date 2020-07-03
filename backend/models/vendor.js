const mongoose = require('mongoose');

let Vendor = new mongoose.Schema({
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
		},
		rating: {
			type: Number
		}
	},
);

module.exports = mongoose.model('Vendor', Vendor);