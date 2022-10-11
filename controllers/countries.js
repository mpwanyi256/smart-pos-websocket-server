const Country = require('../models/countries');
const { validationResult } = require('express-validator');

// Checks to see if required inputs are provided
const validateInput = (req) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
}

// Create a new Supported country
exports.create = (req, res, next) => {
    validateInput(req);

    const { name } = req.body;

    Country.findOne({ name })
        .then(country => {
            if (country) {
                const error = new Error(`${name} already exists`);
                error.statusCode = 422;
                throw error;
            }

            const newCountry = new Country({ name: name.toUpperCase() });
            return newCountry.save()
        })
        .then(result => {
            res.status(201).json({
                message: `${name} was created`,
                isert_id: result._id
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

// Get Country
exports.getByName = (req, res, next) => {
    validateInput(req);

    const { name } = req.body;

    Country.findOne({ name })
    .then(country => {
        const responseCode = country ? 201 : 404;
        res.status(responseCode).json({
            data: country
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}
