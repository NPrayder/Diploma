const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const monoInfoSchema = mongoose.Schema({
    token: String,
    lastLoadingTime: mongoose.Schema.Types.Long,
    user: {
       type: mongoose.Schema.Types.ObjectID,
       ref: 'User'
    }
});

const MonoInfo = mongoose.model('MonoInfo', monoInfoSchema);

module.exports = MonoInfo;
