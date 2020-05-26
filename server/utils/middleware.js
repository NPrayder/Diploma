const jwt = require('jsonwebtoken');

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

const tokenVerifier = (request, response, next) => {
    if (!request.headers.authorization) {
        return response.status(403).json({ error: 'No credentials sent!' });
    }

    if (request.headers.authorization && request.headers.authorization.split(' ')[0] !== 'Bearer') {
        return response.status(403).json({ error: 'No credentials sent!' });
    }

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken) {
        return response.status(403).json({error: 'Bad token'});
    }

    request.body.user = decodedToken;

    next();
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' });
    }

    next(error);
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenVerifier,
};
