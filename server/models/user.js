const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String,
    cardAdded: {
        type: Boolean,
        default: false
    },
    monoToken: String,
    privatToken: String,
    lastMonoLoad: Number
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
        delete returnedObject.monoToken
        delete returnedObject.privatToken
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;