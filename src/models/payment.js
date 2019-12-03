const {
	model,
	Schema,
	Schema: {
		Types: { ObjectId }
	}
} = require('mongoose');

const PAYMENT = new Schema({
    user: {
        type: ObjectId,
		ref:'User'
    },
    reference: {
        type: Number
    },
    bank : {
        type: String
    },
    account:{
        type: Number
    },
    payment:{
        type: Number
    },
    status:{
        type: String,
		default: 'sin confirmar'
    },
    products:[{
        product:{
			type: ObjectId,
			ref: 'Product'
        },
        quantity:{
			type: Number,
		},
    }]
});

module.exports = model('Payment', PAYMENT);