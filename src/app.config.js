//let tokenExpiration = 6000 * 600 * 24; // expires in 24 hours (value expresed in miliseconds.)
const configs = {
	//App Name
	appName: 'E-COMERCE',
	//Route
	//baseUrl: 'www.Canchas.com',
	// port = 443,
	port: process.env.PORT || 3000,
	tokens: {
		// expiration: tokenExpiration,
		secretKey: 'ecomerce'
	},
	database: {
		name: 'E-comerce',
		//NO CAMBIAR. SOLO USAR LOCALHOST
		//url: 'mongodb://18.208.211.71:27017/'
		url: 'mongodb://localhost:27017/'
	}
	/*  mail :{
    user: 'userstore@gmail.com',
    pass: 'pedrofabian2019clave123*'
  } */
};

module.exports = configs;
