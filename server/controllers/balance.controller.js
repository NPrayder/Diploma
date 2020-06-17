const balanceRouter = require('express').Router();
const monobankService = require('../services/monobank.service');
const privatbankService = require('../services/privatbank.service');

balanceRouter.get('/', async (request, response) => {
    const {body} = request;

    try {
        const userId = body.user.id;
        const balances = [];

        if (request.query.bank === 'mono') {
            const monoBalance = await monobankService.getBalance(userId);
            monoBalance && balances.push(...monoBalance);
        } else if (request.query.bank === 'privat') {
            const privatBalance = await privatbankService.getBalance(userId);
            privatBalance && balances.push(...privatBalance);
        } else {
            const monoBalance = await monobankService.getBalance(userId);
            const privatBalance = await privatbankService.getBalance(userId);
            monoBalance && balances.push(...monoBalance);
            privatBalance && balances.push(privatBalance);
        }

        response.json(balances);
    } catch (e) {
        response.status(400).json({
            error: e.message
        });
    }
});

module.exports = balanceRouter;
