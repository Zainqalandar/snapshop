const connectDb = require('./configs/db');
const app = require('./app');
import 'dotenv/config';

const port = process.env.PORT || 5000;

const startServer = async () => {
	await connectDb();

	app.listen(port, () => {
		console.log('This port is Listend on 5000');
	});
};

startServer();