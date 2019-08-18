const { model, Schema } = require('mongoose');

const USER = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	displayName: {
		type: String
	},
	email: {
		type: String,
		// unique: true,
		// dropDups: true,
		required: 'El email ya existe!',
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	},
	phone: {
		type: String
	},
	address: {
		type: String
	},
	brithdate: {
		type: Date
	},
	identification: {
		type: String
	},
	avatar: {
		type: String,
		default: 'default.png'
	},
	password: {
		type: String,
		required: 'la contraseña es requerida'
	},
	status: {
		type: Boolean,
		enum: [true, false],
		default: false
	},
	level: {
		type: Number,
		enum: [0, 1],
		default: 0
	},
	passwordResetToken: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	deletedAt: {
		type: Date
	},
	rating: {
		type: Number,
		default: 0
	}
});

module.exports = model('User', USER);
