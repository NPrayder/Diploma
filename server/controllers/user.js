const userRouter = require('express').Router();
const User = require('../models/user');

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
