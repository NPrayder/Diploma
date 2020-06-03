const transactionsRouter = require('express').Router();
const Mobobank = require('monobank-node');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const CATEGORIES = require('../constants/categories.json');
const mcc = require('mcc');

const MONOBANK = 0;
const PRIVATBANK = 1;

transactionsRouter.get('/', async (request, response) => {
    const { body } = request;

    const selectConfig = buildSelectConfig(request);

    try {
        const user = await User.findOne({ _id: body.user.id });

        await retrieveMonoTransactions(user);
        await User.updateOne({_id: user.id}, {lastMonoLoad: getNow()});

        // await Transaction.deleteMany({});

        console.log(selectConfig);

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

transactionsRouter.get('/categories', (request, response) => {
    response.json(Object.keys(CATEGORIES));
});

async function retrieveMonoTransactions(user) {
    const { monoToken, lastMonoLoad } = user;

    if (getNow() - lastMonoLoad < 60) {
        return false;
    }

    const monobankApi = new Mobobank(monoToken);
    console.log(getTime(lastMonoLoad));
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
        const transaction = new Transaction({ ...t, user, bankType: MONOBANK });
        await transaction.save();
    });
}

function buildSelectConfig(request) {
    const config = {};

    if (request.query.bankName) {
        config.type = +!(request.query.bankName === 'mono')
    }

    if (request.query.category) {
        config.mcc = { "$in" : CATEGORIES[request.query.category]}
    }

    return config;
}

function getTime(time) {
    const now = getNow();
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

function getNow() {
    return Math.floor(Date.now() / 1000);
}

module.exports = transactionsRouter;
