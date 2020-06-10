const transactionsRouter = require('express').Router();
const Mobobank = require('monobank-node');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const CATEGORIES = require('../constants/categories.json');
const mcc = require('mcc');

const MONOBANK = 2;
const PRIVATBANK = 1;

transactionsRouter.get('/', async (request, response) => {
    const {body} = request;

    const selectConfig = buildSelectConfig(request);

    try {
        const userId = body.user.id;

        const isUpdated = await retrieveMonoTransactions(userId);
        isUpdated && await User.updateOne({_id: user.id}, {lastMonoLoad: getNow(true)});

        // await Transaction.deleteMany({});

        const transactions = await Transaction.find({user: user.id, ...selectConfig}).sort('-time');

        const mappedData = transactions.map(t => {
            return {
                ...t.toJSON(),
                mcc: mcc.get(t.mcc).irs_description
            };
        })

        response.json(mappedData);
    } catch (e) {
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

        const isUpdated = await retrieveMonoTransactions(user);
        isUpdated && await User.updateOne({_id: user.id}, {lastMonoLoad: getNow(true)});

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

async function retrieveMonoTransactions(user) {
    const {monoToken, lastMonoLoad} = user;

    if (getNow(true) - lastMonoLoad < 60) {
        return false;
    }

    const monobankApi = new Mobobank(monoToken);
    const transactions = await monobankApi.getStatement(getTime(lastMonoLoad));

    if (transactions.error) {
        throw new Error(transactions.error);
    }

    await saveMonoTransactions(transactions, user.id);
    return true;
}

async function saveMonoTransactions(transactions, user) {
    if (!transactions.length) {
        return;
    }

    await transactions.forEach(async t => {
        const transaction = new Transaction({...t, time: t.time * 1000, user, type: MONOBANK});
        await transaction.save();
    });
}

function buildSelectConfig(request) {
    const config = {};

    if (request.query.bankName) {
        config.type = (request.query.bankName === 'mono') + 1
    }

    if (request.query.category) {
        config.mcc = {"$in": CATEGORIES[request.query.category]}
    }

    if (request.query.startDate || request.query.endDate) {
        const startDate = (request.query.startDate && new Date(request.query.startDate)) || new Date('01/01/2019');
        const endDate = (request.query.endDate && new Date(request.query.endDate)) || new Date();
        config.time = {$gte: startDate.getTime(), $lt: endDate.getTime()}
    }

    return config;
}

function getTime(time) {
    const now = getNow(true);
    const maxPeriod = 2678400;

    if (time) {
        return {
            from: time,
            to: now
        };
    } else {
        return {
            from: now - maxPeriod,
            to: now
        };
    }
}

function getNow(isMono) {
    return isMono ? Math.floor(Date.now() / 1000) : Date.now();
}

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

module.exports = transactionsRouter;
