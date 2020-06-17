const PrivatInfo = require('../models/privat-info.model');
const Transaction = require('../models/transaction.model');
const Merchant = require('privatbank-api');
const banks = require('../constants/bank.constants')

async function getLastLoadingTime(user) {
    try {
        const {lastLoadingTime} = await PrivatInfo.findOne({user});
        return lastLoadingTime || '05.01.2020';
    } catch (e) {
        throw new Error(e.message);
    }
}

async function getLoadInterval(user) {
    try {
        const startTime = await getLastLoadingTime(user);
        const startDate = getPureDate(startTime);
        const endDate = getPureDate(Date.now());

        return [startDate, endDate];
    } catch (e) {
        throw new Error(e.message);
    }
}

function getPureDate(time) {
    const date = new Date(time);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}

async function getCredits(user) {
    try {
        const merchant = await PrivatInfo.findOne({user});
        if (!merchant) {
            return;
        }
        const {userId, cardNum, password} = merchant;
        return {userId, cardNum, password};
    } catch (e) {
        throw new Error(e.message);
    }
}

async function retrieveTransactions(user) {
    try {
        const credits = await getCredits(user);

        if (!credits) {
            return;
        }

        const [startDate, endDate] = await getLoadInterval(user);
        const merchant = new Merchant({
            id: credits.userId,
            password: credits.password,
            country: 'UA'
        });
        const data = await merchant.statement(credits.cardNum, startDate, endDate);
        const {response} = JSON.parse(data);
        const statements = response.data.info
            && response.data.info.statements
            && response.data.info.statements.statement;

        if (statements) {
            const filteredStatements = await filterStatements(statements, user);
            await saveTransactions(filteredStatements, user, credits.cardNum);
        }

        await updateLastLoadingTime(user);
    } catch (e) {
        throw new Error(e.message);
    }
}

async function saveTransactions(statements, user, cardNum) {
    try {
        for (const statement of statements) {
            const newStatement = new Transaction({
                id: statement.appcode,
                time: new Date(`${statement.trandate}:${statement.trantime}`).getTime(),
                description: statement.description,
                mcc: 4829,
                balance: Math.floor(statement.rest.split(' ')[0] * 100),
                amount: Math.floor(statement.cardamount.split(' ')[0] * 100),
                type: banks.PRIVATBANK,
                user,
                cardNum,
            });
            await newStatement.save();
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

async function filterStatements(statements, user) {
    const lastLoadingTime = await getLastLoadingTime(user);
    return statements
        .filter(statement => new Date(`${statement.trandate}:${statement.trantime}`).getTime() > new Date(lastLoadingTime).getTime());
}

async function updateLastLoadingTime(user) {
    await PrivatInfo.updateOne({user}, {lastLoadingTime: Date.now()})
}

async function getBalance(user) {
    try {
        const credits = await getCredits(user);
        console.log(credits);

        if (!credits) {
            return;
        }

        const merchant = new Merchant({
            id: credits.userId,
            password: credits.password,
            country: 'UA'
        });
        const merchantBalance = await merchant.balance(credits.cardNum);
        const {response} = JSON.parse(merchantBalance);
        const {cardbalance} = response.data.info;
        return {
            currency: cardbalance.card.currency,
            cardNum: credits.cardNum.toString(),
            balance: Math.floor(cardbalance.balance * 100),
            creditLimit: Math.floor(cardbalance.fin_limit * 100),
            type: banks.PRIVATBANK,
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    retrieveTransactions,
    getBalance
};
