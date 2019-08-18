import User from '../models/user';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { tokens } from '../app.config';
const { secretKey} = tokens

exports.signup = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).json({
				errors: { message: 'El email ya existe.' }
			});
		} else {
			let new_user = new User(req.body);
			try {
				let pass = await hash(req.body.password, 10);
				new_user.password = pass;
				let user = await new_user.save();
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
			} catch (e) {
				console.log(e);
				res.status(500).json({
					e
				});
			}
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({
			e
		});
	}
};
