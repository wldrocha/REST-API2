// import '@babel/polyfill';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const {
	appName,
	port,
	database: { name, url }
} = require('./app.config');
const { connect } = require('mongoose');


const app = express();
app.use(
	express.json({
		limit: '20mb'
	})
);
app.use(
	express.urlencoded({
		limit: '20mb',
		extended: false
	})
);
app.use('/public', express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(compression());
app.use(morgan('tiny'));
app.use(helmet());

// Routes
const userRoutes = require('./routes/user.routes');
// import userRoutes from './routes/user.routes';

app.use(userRoutes);

async function main() {
	await app.listen(port);
	try {
		await connect(
			`${url}${name}`,
			{
				useNewUrlParser: true
			}
		);
		await console.log(`${appName} RESTful API server started on: ${port}`);
	} catch (e) {
		console.log(`${appName} RESTful API server it's off :( `, e);
	}
}

main();
