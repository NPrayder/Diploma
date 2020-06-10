const mongoose = require('mongoose');

const rateHistorySchema = mongoose.Schema({
    currencyName: String,
    currencySymbol: String,
    date: mongoose.Schema.Types.Date,
    sellPrice: Number,
    buyPrice: Number
});

rateHistorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const RateHistory = mongoose.model('RateHistory', rateHistorySchema);

module.exports = RateHistory;
