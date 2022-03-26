require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// User authentication
const authentication = require('./middleware/authentication');

// Routes
const authRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const ticketRouter = require('./routes/tickets');

// Middleware

// Error Handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => {
	res.send('Home');
});

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', authentication, projectRouter);
app.use('/api/v1/projects/:projectID/tickets', ticketRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//MongoDB connect
const connectDB = require('./db/connect');
const errorHandlers = require('./middleware/error-handler');

const port = process.env.PORT || 5000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`listening to port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();

// TODO: start on project model, controller and routes.
