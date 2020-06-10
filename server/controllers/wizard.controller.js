const wizardRouter = require('express').Router();
const User = require('../models/user.model');
const MonoInfo = require('../models/mono-info.model');
const PrivatInfo = require('../models/privat-info.model');
const Mobobank = require('monobank-node');
const Merchant = require('privatbank-api');

wizardRouter.post('/add-mono-token', async (request, response) => {
    const {body} = request;

    try {
        const userId = body.user.id;
        const monoTokenRecord = await MonoInfo.findOne({token: body.token, user: userId});

        if (monoTokenRecord) {
            return response.status(400).json({
                error: 'Such token for this user already added'
            });
        }

        const monobankApi = new Mobobank(body.token);
        const monoResponse = await monobankApi.getPersonalInfo();

        if (monoResponse.errorDescription) {
            return response.status(400).json({
                error: 'Invalid token'
            });
        }

        const newMonoToken = new MonoInfo({
            token: body.token,
            user: userId
        });
        await newMonoToken.save();
        await User.findByIdAndUpdate(userId, {cardAdded: true}, {upsert: true, useFindAndModify: false});

        response.json({
            mgs: 'Token successfully added'
        });
    } catch (e) {
        response.status(500).json({
            error: e.message
        });
    }
});

wizardRouter.post('/add-privat-token', async (request, response) => {
    const {body} = request;

    try {
        const {privatUserId, cardNum, password} = body;
        const userId = body.user.id;

        const privatInfoRecord = await PrivatInfo.findOne({userId: privatUserId, cardNum, user: userId});
        if (privatInfoRecord) {
            return response.status(400).json({
                'error': 'Such card already added for this user'
            });
        }

        const merchant = new Merchant({
            id: privatUserId,
            password,
            country: 'UA'
        });
        const balance = await merchant.balance(cardNum);
        const parsedBalance = JSON.parse(balance);
        if (parsedBalance.response.data.error) {
            return response.status(400).json({
                error: 'Invalid merchant info'
            });
        }

        const newPrivatInfo = new PrivatInfo({
            userId: privatUserId,
            cardNum,
            password,
            user: userId
        });
        await newPrivatInfo.save();
        await User.findByIdAndUpdate(userId, {cardAdded: true}, {upsert: true, useFindAndModify: false});

        response.json({
            mgs: 'Merchant successfully added'
        });
    } catch (e) {
        response.status(500).json({
            error: e.message
        });
    }
});

module.exports = wizardRouter;
