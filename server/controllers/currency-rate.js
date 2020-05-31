const currencyRateRouter = require('express').Router();
const Monobank = require('monobank-node');
const USD = require('../rates/usd.json')
const EUR = require('../rates/eur.json')
const RUB = require('../rates/rub.json')
const PLN = require('../rates/pln.json')

currencyRateRouter.get('/', async (request, response) => {
    try {
        const monobankApi = new Monobank();
        const rates = await monobankApi.getCurrencyRates();

        if (rates.errorDescription) {
            throw new Error(rates.errorDescription);
        }

        const filteredRates = rates.filter(rate => rate.rateBuy);
        response.json(filteredRates);
    } catch (e) {
        response.status(500).json({
            error: e.message
        });
    }
});

currencyRateRouter.get('/:curName', async (request, response) => {
    const {curName} = request.params;

    switch (curName) {
        case 'usd':
            return response.json(USD);
        case 'eur':
            return response.json(EUR);
        case 'pln':
            return response.json(PLN);
        case 'rub':
            return response.json(RUB);
        default:
            return response.status(400).json({
               error: 'Немає даних по цій валюті'
            });
    }
});

module.exports = currencyRateRouter;
