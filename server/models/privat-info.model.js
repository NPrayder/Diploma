const mongoose = require('mongoose');

const privatInfoSchema = mongoose.Schema({
    userId: String,
    cardNum: Number,
    password: String,
    lastLoadingTime: mongoose.Schema.Types.Date,
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }
});

const PrivatInfo = mongoose.model('PrivatInfo', privatInfoSchema);

module.exports = PrivatInfo;
