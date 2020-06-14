const PrivatInfo = require('../models/privat-info.model');
const Transaction = require('../models/transaction.model');
const Merchant = require('privatbank-api');
const banks = require('../constants/bank.constants')

async function getLastLoadingTime(user) {
    const {lastLoadingTime} = await PrivatInfo.findOne({user});
    return lastLoadingTime || '05.01.2020';
}

async function getLoadInterval(user) {
    const startTime = await getLastLoadingTime(user);
    const startDate = getPureDate(startTime);
    const endDate = getPureDate(Date.now());

    return [startDate, endDate];
}

function getPureDate(time) {
    const date = new Date(time);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}

async function getCredits(user) {
    const {userId, cardNum, password} = await PrivatInfo.findOne({user});
    return {userId, cardNum, password};
}

async function retrieveTransactions(user) {
    const credits = await getCredits(user);
    const [startDate, endDate] = await getLoadInterval(user);
    const merchant = new Merchant({
        id: credits.userId,
        password: credits.password,
        country: 'UA'
    });
    const data = await merchant.statement(credits.cardNum, startDate, endDate);
    const {response} = JSON.parse(data);
    const statements = response.data.info.statements.statement;

    if (statements) {
        const filteredStatements = await filterStatements(statements, user);
        await saveTransactions(filteredStatements, user);
    }

    await updateLastLoadingTime(user);
}

async function saveTransactions(statements, user) {
    for (const statement of statements) {
        const newStatement = new Transaction({
            id: statement.appcode,
            time: new Date(`${statement.trandate}:${statement.trantime}`).getTime(),
            description: statement.description,
            mcc: 4829,
            balance: Math.floor(statement.rest.split(' ')[0] * 100),
            amount: Math.floor(statement.cardamount.split(' ')[0] * 100),
            type: banks.PRIVATBANK,
            user
        });
        console.log(newStatement);
        await newStatement.save();
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

module.exports = {
    retrieveTransactions
};
