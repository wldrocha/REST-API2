const {
	tokens: { secretKey },
} = require('../app.config');
const { verify } = require('jsonwebtoken');
const Payment = require('../models/payment');
const Product = require('../models/product');
const User = require('../models/user');

exports.getShoppingCar = async (req, res) => {
	let { id } = req.params;
	try {
		let supplishoppingCar = await ShoppingCar.findOne({ _id: id });
		res.status(200).json({
			shoppingCar,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Ocurrio un problema en el servidor',
			error,
		});
	}
};

exports.addPayment = async (req, res) => {
	if (req.headers && req.headers.authentication) {
		var authentication = req.headers.authentication,
			decoded;
		try {
			decoded = verify(authentication.split(' ')[1], secretKey);
		} catch (e) {
			return res.status(401).send('Unauthorized.');
		}
		let payment = {
			user: decoded.userId,
			products: req.body.products,
			reference: req.body.reference,
			bank: req.body.bank,
			account: req.body.account,
			payment: req.body.price,
		};
		try {
			payment.products.forEach(async (element) => {
				let product = await Product.findById(element.product);
				let quantity = parseInt(product.quantity) - parseInt(element.quantity);
				if (quantity > 0) {
					let up = await Product.updateOne(
						{ _id: element.product },
						{ $set: { quantity: quantity } }
					);
					await User.updateOne(
						{ _id: decoded.userId },
						{ $unset: { shoppingCar: '' } }
					);
					payment = new Payment(payment);
					payment = await payment
						.save()
						.then((result) => {
							res.status(201).json({
								message: 'pago guardado exitosamente.',
								payment,
							});
						})
						.catch((err) => {
							res.status(400).json({
								message: 'Fallo al guardar su pago.',
								error: err,
							});
						});
				} else {
					res.status(401).json({
						message: 'No tenemos la esa cantidad en existencia.',
					});
				}
			});
		} catch (error) {
			res.status(500).json({
				message: 'Failed to save Supplier.',
				error,
			});
		}
	}
};

exports.editPayment = async (req, res) => {
	if (req.headers && req.headers.authentication) {
		var authentication = req.headers.authentication,
			decoded;
		try {
			decoded = verify(authentication.split(' ')[1], secretKey);
		} catch (e) {
			return res.status(401).send('Unauthorized.');
		}

		let payment = {
			user: decoded.userId,
			reference: req.body.reference,
			bank: req.body.bank,
			account: req.body.account,
			payment: req.body.payment,
			status: req.body.status,
		};

		Payment.update({ _id: req.params.id }, { $set: { status: payment.status } })
			.exec()
			.then((result) => {
				Payment.find()
					.then((payment) => {
						res.status(200).json({
							message: 'Estado Actualizado',
							payment,
						});
					})
					.catch((err) => {
						res.status(400).json({
							message: 'Pago no encontrado',
							error: err,
						});
					});
			})
			.catch((err) => {
				res.status(400).json({
					message: 'Pago no encontrado',
					error: err,
				});
			});
	}
};

exports.listAll = async (req, res) => {
	try {
		let payments = await Payment.find()
			.populate(['user', 'products.product'])
			.exec();
		res.status(200).json({
			payments,
		});
	} catch (error) {
		res.status(401).json({
			message: 'No tienes autorización para seguir',
			error,
		});
	}
};

exports.listPaymentUser = async (req, res) => {
	if (req.headers && req.headers.authentication) {
		var authentication = req.headers.authentication,
			decoded;
		try {
			decoded = verify(authentication.split(' ')[1], secretKey);
		} catch (e) {
			return res.status(401).send('Unauthorized.');
		}

		try {
			let payment = await Payment.find({ user: decoded.userId });
			res.status(200).json({
				payment,
			});
		} catch (error) {
			res.status(401).json({
				message: 'No tienes Pagos asociados',
				error,
			});
		}
	}
};
