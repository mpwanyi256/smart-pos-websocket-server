const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {

    const { email, password, name } = req.body;
    
    User.findOne({ email })
        .then(foundUser => {
            if (foundUser) throw new Error(`Sorry, ${email} already exists.`)
            return bcrypt.hash(password, 12)
        })
        .then(hashedPassword => {
            const user = new User({
                email,
                password: hashedPassword,
                name,
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: `New account for ${email} was created`,
                isert_id: result._id
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.login = (req, res, next) => {
    const email = req.body.email,
          password = req.body.password;

    let foundUser;

    User.findOne({ email })
        .then(userDocument => {
            if (!userDocument) {
                const error = new Error('No user found.');
                error.statusCode = 401;
                throw error;
            }
            foundUser = userDocument;
            return bcrypt.compare(password, userDocument.password);
        })
        .then(isValidPassword => {
            if (!isValidPassword) {
                const error = new Error('Invalid email or password');
                error.statusCode = 401;
                throw error;
            }
            // Generate a JWT
            const token = jwt.sign(
                {
                    email: foundUser.email,
                    id: foundUser._id.toString()
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                token,
                userId: foundUser._id.toString()
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
