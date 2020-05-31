const wizardRouter = require('express').Router();
const User = require('../models/user');
const Mobobank = require('monobank-node');

wizardRouter.post('/monobank/add-token', async (request, response) => {
    const { body } = request;

    try {
        const monobankApi = new Mobobank(body.token);
        const monoResponse = await monobankApi.getPersonalInfo();

        if (monoResponse.errorDescription) {
            return response.status(400).json({
                error: 'Невалідний токен'
            });
        }

        const userId = body.user.id;
        await User.findByIdAndUpdate(userId, { monoToken: body.token }, { upsert: true })

        response.json({
            mgs: 'Токен успішно додано'
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
