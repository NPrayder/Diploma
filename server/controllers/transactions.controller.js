const transactionsRouter = require('express').Router();
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const CATEGORIES = require('../constants/categories.json');
const monobankService = require('../services/monobank.service');
const privatbankService = require('../services/privatbank.service');
const mcc = require('mcc');

transactionsRouter.get('/', async (request, response) => {
    const {body} = request;

    const selectConfig = buildSelectConfig(request);

    try {
        const userId = body.user.id;
        console.log(userId);

        await monobankService.getTransactions(userId);
        await privatbankService.retrieveTransactions(userId);

        // await Transaction.deleteMany({});
        // await User.deleteMany({});

        const transactions = await Transaction.find({
            user: userId,
            ...selectConfig
        }).sort('-time');

        const mappedData = transactions.map(t => {
            return {
                ...t.toJSON(),
                mcc: mcc.get(t.mcc).irs_description
            };
        })

        response.json(mappedData);
    } catch (e) {
        console.log(e);
        response.status(400).json({
            error: e.message
        });
    }
});

transactionsRouter.get('/stats', async (request, response) => {
    const {body} = request;

    const selectConfig = buildSelectConfig(request);

    try {
        const user = await User.findOne({_id: body.user.id});

        await monobankService.retrieveTransactions(user.id);
        await privatbankService.retrieveTransactions(user.id);

        const expenses = await aggregateData({amount: {$lte: 0}}, selectConfig);
        const incomes = await aggregateData({amount: {$gte: 0}}, selectConfig);

        response.json({expenses, incomes});
    } catch (e) {
        response.status(400).json({
            error: e.message
        });
    }
});

transactionsRouter.get('/categories', (request, response) => {
    response.json(Object.keys(CATEGORIES));
});

async function aggregateData(condition, config) {
    const [data] = await Transaction.aggregate([
        {
            $match: {$and: [condition, config]},
        },
        {
            $group: {
                _id: null,
                total: {$sum: '$amount'}
            }
        }]);

    if (data && data.total) {
        return data.total / 100;
    } else {
        return 0;
    }
}

function buildSelectConfig(request) {
    const config = {};

    if (request.query.bankName) {
        config.type = (request.query.bankName === 'mono') + 1
    }

    if (request.query.category) {
        config.mcc = {"$in": CATEGORIES[request.query.category]}
    }

    if (request.query.cardNum) {
        config.cardNum = request.query.cardNum;
    }

    if (request.query.startDate || request.query.endDate) {
        const startDate = (request.query.startDate && new Date(request.query.startDate)) || new Date('01/01/2019');
        const endDate = (request.query.endDate && new Date(request.query.endDate)) || new Date();
        config.time = {$gte: startDate.getTime(), $lt: endDate.getTime()}
    }

    return config;
}

module.exports = transactionsRouter;
