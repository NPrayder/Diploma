const userRouter = require('express').Router();
const User = require('../models/user.model');
const Monobank = require('monobank-node');

userRouter.get('/user-info', async (request, response) => {
    const { body } = request;

    try {
        const user = await User.findOne({ _id: body.user.id });
        const { monoToken } = user;

        const monobankApi = new Monobank(monoToken);
        const info = await monobankApi.getPersonalInfo();

        response.json(info);
    } catch (e) {
        response.status(400).json({
            error: e.message
        });
    }
});

userRouter.get('/get-user/:id', async (request, response) => {
    const {id} = request.params;

    const user = await User.findById(id);

    if (!user) {
        return response.status(404).json({
            error: 'There are no such user'
        });
    }

    response.json({
        user: user.toJSON()
    })
});

module.exports = userRouter;
