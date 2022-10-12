const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/user');

const authController = require('../controllers/auth');
const validateInput = require('../middleware/validateInput');

router.put(
    '/signup', 
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email')
            .custom((value, { req }) => {
                return User.findOne({ email: value })
                    .then(userDocument => {
                        if (userDocument) {
                            Promise.reject('Email already exists');
                        }
                    })
            }).normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must have atleast 6 characters'),
        body('name')
            .trim()
            .not()
            .isEmpty()

    ],
    validateInput,
    authController.signup);

router.post('/login', authController.login);

module.exports = router;