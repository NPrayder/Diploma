const mongoose = require('mongoose');
const RateHistory = require('../models/rate-history.model');
const USD = require('../constants/usd.json');
const EUR = require('../constants/eur.json');
const RUB = require('../constants/rub.json');
const PLN = require('../constants/pln.json');
const GBP = require('../constants/gbp.json');
const config = require('../utils/config');


mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        console.log('connected to MongoDB')
        // await saveCurrencyToDB(USD, 'usd', '$');
        // await saveCurrencyToDB(EUR, 'eur', '€');
        // await saveCurrencyToDB(RUB, 'rub', '₽');
        // await saveCurrencyToDB(PLN, 'pln', 'zł');
        // await saveCurrencyToDB(GBP, 'gbp', '£');
        await tryReviewData();
        await mongoose.disconnect();
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    });

async function tryReviewData() {
    const history = await RateHistory.find({currencyName: 'gbp'}).sort('date');
    console.log(history.length);
}

async function saveCurrencyToDB(currencyRates, currencyName, currencySymbol) {
    for (const record of currencyRates) {
        const newHistoryRecord = RateHistory({
            currencySymbol,
            currencyName,
            date: new Date(record.time),
            buyPrice: record.buy,
            sellPrice: record.sell
        });
        await newHistoryRecord.save();
    }
    console.log(`^_^ -> ${currencyName}`);
}
