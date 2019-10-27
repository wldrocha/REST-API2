// import '@babel/polyfill';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')

const {
	appName,
	port,
	database: { name, url }
} = require('./app.config');
const { connect } = require('mongoose');


const app = express();
app.use(cors());
app.use(
	express.json({
		limit: '20mb'
	})
);
app.use(
	express.urlencoded({
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

// app.use(function (req, res, next) {

// 	// Website you wish to allow to connect
// 	res.setHeader('Access-Control-Allow-Origin', '*');

// 	// // Request methods you wish to allow
// 	res.setHeader('Access-Control-Allow-Methods', '*');

// 	// // Request headers you wish to allow
// 	res.setHeader('Access-Control-Allow-Headers', 'content-type, authentication, *');

// 	// // Set to true if you need the website to include cookies in the requests sent
// 	// // to the API (e.g. in case you use sessions)
// 	res.setHeader('Access-Control-Allow-Credentials', true);

// 	// Pass to next layer of middleware
// 	next();
// });


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
