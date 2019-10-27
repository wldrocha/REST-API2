const { model, Schema } = require('mongoose');

const CATEGORY = new Schema({
	name: {
		type: String,
		required: 'El nombre es requerido.'
	},
	img: {
		type: String
	},
	createdAt: {
		user: {
			type: Schema.objectId,
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
				type: Schema.objectId,
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
			type: Schema.objectId,
			ref: 'User'
		},
		date: {
			type: Date,
			default: Date
		}
	}
});

module.exports = model('Category', CATEGORY);
