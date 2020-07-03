const mongoose = require('mongoose');

let Product = new mongoose.Schema({
	    product: {
	        type: String
	    },
	    quantity: {
	        type: Number
		},
		price: {
			type: Number
		},
		vendor: {
			type: String
        },
        remaining: {
            type: Number
        },
        status: {
            type: String 
		},
		vendorrating: {
			type: Number
		}
	},
);

module.exports = mongoose.model('Product', Product);