const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
    const { body } = request;

    try {
        const user = await User.findOne({ email: body.email });
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(body.password, user.passwordHash);

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'Invalid email or password'
            });
        }

        const userForToken = {
            id: user.id,
            email: user.email,
            name: user.name,
            cardAdded: user.cardAdded
        };

        const token = jwt.sign(userForToken, process.env.SECRET);

        response.json({
            token,
            ...user.toJSON()
        });
    } catch (e) {
        console.log(e.message);
        response.status(400).json({
            error: e.message
        });
    }
});

loginRouter.post('/sign-up', async (request, response) => {
    const { body } = request;

    try {
        const user = await User.findOne({ email: body.email });

        if (user !== null) {
            return response.status(409).json({
                error: 'such user already exist'
            });
        }

        if (body.password.length < 6) {
            return response.status(400).json({
                error: 'Password is too short'
            });
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const newUser = new User({
            email: body.email,
            name: body.name,
            passwordHash
        });

        await newUser.save();

        const userForToken = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            cardAdded: newUser.cardAdded
        };

        const token = jwt.sign(userForToken, process.env.SECRET);

        response.status(201).json({
            msg: 'User succesfully created',
            token,
            ...userForToken
        });
    } catch (e) {
        response.status(400).json({
            error: e.message
        });
    }
});

module.exports = loginRouter;
