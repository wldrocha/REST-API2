const {
	model,
	Schema,
	Schema: {
		Types: { ObjectId }
	}
} = require('mongoose');

const SUPPLIER = new Schema({
	name: {
		type: String,
		// required: 'El nombre es requerido.'
	},
	address: {
		type: String,
		// required: 'La dirección es requerida.'
	},
	contact: {
		phonenumber: {
			type: String
		},
		web: {
			type: String
		}
	},
	createdAt: {
		user: {
			type: ObjectId,
			ref: 'User'
		},
		date: {
			type: Date,
			default: Date.now
		}
	},
	updatedAt: [
		{
			user: {
				type: ObjectId,
				ref: 'User'
			},
			date: {
				type: Date,
				default: Date
			}
		}
	],
	deletedAt: {
		user: {
			type: ObjectId,
			ref: 'User'
		},
		date: {
			type: Date,
			default: Date
		}
	}
});

module.exports = model('Supplier', SUPPLIER);
