const Transaction = require('../models/transaction.model');
const MonoInfo = require('../models/mono-info.model');
const bank = require('../constants/bank.constants');
const Mobobank = require('monobank-node');

async function retrieveTransactions(userId) {
    const {token, lastLoadingTime, cardNum} = await MonoInfo.findOne({user: userId});

    if (getNow(true) - lastLoadingTime < 60) {
        return false;
    }

    const monobankApi = new Mobobank(token);
    const transactions = await monobankApi.getStatement(getTime(lastLoadingTime));

    if (transactions.error) {
        throw new Error(transactions.error);
    }

    await saveTransactions(transactions, userId, cardNum);
    return true;
}

async function saveTransactions(transactions, user, cardNum) {
    if (!transactions.length) {
        return;
    }

    for (const transaction of transactions) {
        const newTransaction = new Transaction({
            ...transaction,
            time: transaction.time * 1000,
            user,
            type: bank.MONOBANK,
            cardNum
        });
        await newTransaction.save();
    }
}

async function getTransactions(userId) {
    const isUpdated = await retrieveTransactions(userId);
    isUpdated && await MonoInfo.updateOne({user: userId}, {lastLoadingTime: getNow(true)});
}

function getNow(isMono) {
    return isMono ? Math.floor(Date.now() / 1000) : Date.now();
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

async function getBalance(user) {
    const {token} = await MonoInfo.findOne({user});
    const monobankApi = new Mobobank(token);
    const {accounts} = await monobankApi.getPersonalInfo();
    const accountsWithMoney = accounts.filter(account => account.balance);

    return accountsWithMoney.map(account => ({
        currency: 'UAH',
        balance: account.balance,
        creditLimit: account.creditLimit,
        cardNum: account.maskedPan[0],
        type: bank.MONOBANK
    }));
}

module.exports = {
    retrieveTransactions,
    getTransactions,
    getBalance,
}
