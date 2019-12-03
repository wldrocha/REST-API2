const {
	model,
	Schema,
	Schema: {
		Types: { ObjectId },
	},
} = require('mongoose');

const PRODUCT = new Schema({
	code: {
		type: String,
		// required: 'El código es necesario'
	},
	name: {
		type: String,
		required: 'El nombre es necesario.',
	},
	pictures: {
		type: Array,
	},
	description: {
		type: String,
	},
	price: {
		type: String,
	},
	supplier: {
		type: ObjectId,
		ref: 'Supplier',
	},
	size: {
		type: Number,
	},
	quantity: {
		type: Number,
	},
	// lot:[{
	// 	supplier: {
	// 		type: ObjectId,
	// 		ref:'Supplier'
	// 	},
	// 	sizes: [{
	// 		size: Number,
	// 		initialQuantity: Number,
	// 	}],
	// 	date: {
	// 		type: Date
	// 	}
	// }],

	type: { type: String },
	comments: [
		{
			user: { type: ObjectId, ref: 'User' },
			comment: { type: String },
			rating: Number,
			answer: String,
			createdAt: { type: Date, default: Date.now },
			updatedAt: { type: Date },
			deletedAt: { type: Date },
		},
	],
	questions: [
		{
			user: { type: ObjectId, ref: 'Users' },
			question: { type: String },
			answer: {
				answer: { type: String },
				createdAt: { type: Date, default: Date.now },
				updatedAt: { type: Date },
				deletedAt: { type: Date },
			},
			createdAt: { type: Date, default: Date.now },
			updatedAt: { type: Date },
			deletedAt: { type: Date },
		},
	],
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	createdAt: {
		user: {
			type: ObjectId,
			ref: 'User',
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	updatedAt: [
		{
			user: {
				type: ObjectId,
				ref: 'User',
			},
			date: {
				type: Date,
				default: Date,
			},
		},
	],
	deletedAt: {
		user: {
			type: ObjectId,
			ref: 'User',
		},
		date: {
			type: Date,
			default: Date,
		},
	},
});

module.exports = model('Product', PRODUCT);
