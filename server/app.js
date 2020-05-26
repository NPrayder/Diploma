const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const morgan = require('morgan');

const loginRouter = require('./controllers/login');
const wizardRouter = require('./controllers/wizard');
const transactionsRouter = require('./controllers/transactions');
const currencyRateRouter = require('./controllers/currency-rate');
const userRouter = require('./controllers/user');

const app = express();

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// unguarder routes
app.use('/api/login', loginRouter);

// guarded routes
app.use(middleware.tokenVerifier);

app.use('/api/wizard', wizardRouter);
app.use('/api/mono', transactionsRouter);
app.use('/api/rate', currencyRateRouter);
app.use('/api/user', userRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
