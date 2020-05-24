const wizardRouter = require('express').Router();
const User = require('../models/user');

wizardRouter.post('/monobank/add-token', async (request, response) => {
    const { body } = request;

    try {
        const userId = body.user.id;
        await User.findByIdAndUpdate(userId, { monoToken: body.token }, { upsert: true })

        response.json({
            mgs: 'Token succesfully added'
        });
    } catch (e) {
        response.status(400).json({
            error: e.message
        });
    }
});

wizardRouter.post('/privat/add/token', async (request, response) => {
    response.status(500).end();
});

module.exports = wizardRouter;