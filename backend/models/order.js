const mongoose = require('mongoose');

let Order = new mongoose.Schema({
		vendor: {
			type: String
		},
        product: {
            type: String
        },
	    productid: {
	        type: String
	    },
	    quantity: {
	        type: Number
		},
		price: {
			type: Number
		},
		useremail: {
			type: String
        },
        status: {
            type: String
        },
        remaining: {
            type: Number
		},
		vendorrated: {
			type: Number
		},
		orderrated: {
			type: Number
		},
		vendorrating: {
			type: Number
		}
	},
);

module.exports = mongoose.model('Order', Order);