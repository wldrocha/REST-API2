const { hash, compare } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const {
	tokens: { secretKey }
} = require('../app.config');
const User = require('../models/user');

exports.signup = async (req, res) => {
	try {
		let { email, password } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				errors: { message: 'El email ya existe.' }
			});
		} else {
			let newUser = new User(req.body);
			try {
				password = await hash(password, 10);
				newUser.password = password;
				let user = await newUser.save();
				let expDateToken = Math.floor(Date.now() / 1000) + 60 * 60;

				const token = sign(
					{
						email: user.email,
						userId: user._id
					},
					secretKey,
					{ expiresIn: expDateToken }
				);
				console.log(res);
				res.status(201).json({
					message: 'Nuevo usuario creado',
					code: token,
					user
				});
			} catch (error) {
				console.log(error);
				res.status(500).json({
					error
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error
		});
	}
};

exports.login = async (req, res) => {
	let { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user.length > 0) {
			try {
				let match = await compare(password, user[0].password);
				let expDateToken = Math.floor(Date.now() / 1000) + 60 * 60;
				const TOKEN = jwt.sign(
					{
						email: user[0].email,
						userId: user[0]._id
					},
					config.tokens.secretKey,
					{ expiresIn: expDateToken }
				);
				res.status(201).json({
					message: 'Autenticación exitosa.',
					token: {
						access_token: TOKEN,
						expires_in: expDateToken,
						token_type: 'Bearer '
					}
				});
			} catch (error) {
				res.status(400).json({
					message: 'Fallo de autenticación'
				});
			}
		} else {
			res.json.status(404).json({
				message: 'Email no encontrado, el usuario no existe'
			});
		}
	} catch (error) {
		res.status(500).json({
			error
		});
	}
};

exports.getUSer = (req, res) => {
	let { Authorization } = req.headers;

	try {
		decoded = verify(Authorization.split(' ')[1], secretKey);
		try {
			let user = User.findOne({ _id: decoded.userId });
			res.status(200).json({
				user
			});
		} catch (error) {
			res.status(500).json({
				message: 'Ocurrio un problema en el servidor',
				error
			});
		}
	} catch (error) {
		return res.status(401).json({
			message: 'No tienes autorización para seguir',
			error
		});
	}
};

exports.getUsers = (req, res) => {

	let Authorization = req.headers;
	try {
		decoded = verify(Authorization.split(' ')[1], secretKey);
		try {
			let users = User.find();
			res.status(200).json({
				users
			});
		} catch (error) {
			res.status(401).json({
				message: 'No tienes autorización para seguir',
				error
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'Ocurrio un problema en el servidor',
			error
		});
		
	}
};
