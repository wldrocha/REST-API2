const { verify } = require('jsonwebtoken');
const {
	tokens: { secretKey }
} = require('../app.config');

module.exports = (req, res, next) => {
	try {
		const decoded = verify(req.headers.authentication.split(' ')[1], secretKey);
		req.userDate = decoded;
	} catch (error) {
		return res.status(401).json({
			message: 'Auth Failed.'
		});
	}
	next();
};
