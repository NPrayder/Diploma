const monoRuter = require('express').Router();
const Mobobank = require('monobank-node');
const User = require('../models/user');
const Transaction = require('../models/transaction');

monoRuter.get('/user-info', async (request, response) => {
    const { body } = request;

    try {
        const user = await User.findOne({ _id: body.user.id });
        const { monoToken } = user;

        const monobankApi = new Mobobank(monoToken);
        const info = await monobankApi.getPersonalInfo();

        response.json(info);
    } catch (e) {
        response.status(400).json({
            error: e.message
        });
    }
});

monoRuter.get('/transactions', async (request, response) => {
    const { body } = request;

    try {
        const user = await User.findOne({ _id: body.user.id });

        await retrieveTransactions(user);
        await User.updateOne({_id: user.id}, {lastMonoLoad: getNow()});

        // await Transaction.deleteMany({});
        
        const transactions = await Transaction.find({user: user.id}).sort('-time');

        response.json(transactions.map(t => t.toJSON()));
    } catch (e) {
        response.status(400).json({
            error: e.message
        });
    }
});

async function retrieveTransactions(user) {
    const { monoToken, lastMonoLoad } = user;

    if (getNow() - lastMonoLoad < 60) {
        return;
    }

    const monobankApi = new Mobobank(monoToken);
    console.log(getTime(lastMonoLoad));
    const transactions = await monobankApi.getStatement(getTime(lastMonoLoad));

    if (transactions.error) {
        throw new Error(transactions.error);
    }

    await saveTransactions(transactions, user.id);
}

async function saveTransactions(transactions, user) {
    if (!transactions.length) {
        return;
    }

    await transactions.forEach(async t => {
        const transaction = new Transaction({ ...t, user });
        await transaction.save();
    });
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

module.exports = monoRuter;