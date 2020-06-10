const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const transactionSchema = mongoose.Schema({
    id: String,
    time: mongoose.Schema.Types.Long,
    description: String,
    mcc: Number,
    balance: Number,
    amount: Number,
    type: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

transactionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        returnedObject.balance = returnedObject.balance / 100;
        returnedObject.amount = returnedObject.amount / 100;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
