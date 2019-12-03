// import '@babel/polyfill';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const {
	appName,
	port,
	database: { name, url },
} = require('./app.config');
const { connect } = require('mongoose');

const app = express();
app.use(cors());
app.use(
	express.json({
		limit: '20mb',
	})
);
app.use(
	express.urlencoded({
		extended: false,
	})
);
// app.use(compression());
app.use(morgan('tiny'));
app.use(helmet());

// Routes
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const supplierRoutes = require('./routes/supplier.routes');
const paymentRoutes = require('./routes/payment.routes');
// import userRoutes from './routes/user.routes';

app.use(userRoutes);
app.use(productRoutes);
app.use(supplierRoutes);
app.use(paymentRoutes);

app.use(express.static(path.join(__dirname, 'public')));

async function main() {
	await app.listen(port);
	try {
		await connect(`${url}${name}`, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		await console.log(`${appName} RESTful API server started on: ${port}`);
	} catch (error) {
		console.log(`${appName} RESTful API server it's off :( `, error);
	}
}

main();
