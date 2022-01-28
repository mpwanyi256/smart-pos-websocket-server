const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    let decordedToken;

    try {
        decordedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decordedToken) {
        const err = new Error('Not authenticated');
        err.statusCode = 401;
        throw err;
    }
    req.userId = decordedToken.id;
    req.email = decordedToken.email;

    next();
};
