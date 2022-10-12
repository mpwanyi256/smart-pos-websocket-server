const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateInput = require('../middleware/validateInput');

const { body } = require('express-validator');

// You must be authenticated to create a country
router.put(
    '/create',
    [
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    isAuthenticated,
    validateInput,
    countriesController.create
);

router.post(
    '/getByName',
    [
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    isAuthenticated,
    validateInput,
    countriesController.getByName
);

module.exports = router;