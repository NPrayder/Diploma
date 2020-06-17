const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const morgan = require('morgan');

const loginRouter = require('./controllers/login.controller');
const wizardRouter = require('./controllers/wizard.controller');
const transactionsRouter = require('./controllers/transactions.controller');
const currencyRateRouter = require('./controllers/currency-rate.controller');
const userRouter = require('./controllers/user.controller');
const balanceRouter = require('./controllers/balance.controller');

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

// unguarded routes
app.use('/api/login', loginRouter);
app.use('/api/rate', currencyRateRouter);

// guarded routes
app.use(middleware.tokenVerifier);
app.use('/api/wizard', wizardRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/user', userRouter);
app.use('/api/balance', balanceRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
