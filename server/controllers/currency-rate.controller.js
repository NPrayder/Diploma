const currencyRateRouter = require('express').Router();
const RateHistory = require('../models/rate-history.model');

currencyRateRouter.get('/', async (request, response) => {
    try {
        const usdRate = await RateHistory.findOne({currencyName: 'pln'}).sort({date: -1});
        const eurRate = await RateHistory.findOne({currencyName: 'eur'}).sort({date: -1});
        const plnRate = await RateHistory.findOne({currencyName: 'pln'}).sort({date: -1});
        const gbpRate = await RateHistory.findOne({currencyName: 'gbp'}).sort({date: -1});
        const rubRate = await RateHistory.findOne({currencyName: 'rub'}).sort({date: -1});

        response.json([usdRate, eurRate, plnRate, gbpRate, rubRate]);
    } catch (e) {
        response.status(500).json({
            error: e.message
        });
    }
});

currencyRateRouter.get('/:currencyName', async (request, response) => {
    const {currencyName} = request.params;

    try {
        const historyByRate = await RateHistory.find({currencyName}).sort('date');

        if (!historyByRate.length) {
            return response.status(404).json({
                error: 'There are no information about this currency'
            });
        }

        response.json(historyByRate.map(record => record.toJSON()));
    } catch (e) {
        response.status(500).json({
            error: e.message
        });
    }
});

module.exports = currencyRateRouter;
