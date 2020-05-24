const currencyRateRouter = require('express').Router();
const Monobank = require('monobank-node');

currencyRateRouter.get('/', async (request, response) => {
    const monobankApi = new Monobank();
    const rates = await monobankApi.getCurrencyRates();

    response.json(rates);
});

module.exports = currencyRateRouter;