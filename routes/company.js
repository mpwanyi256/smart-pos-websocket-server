const express = require('express');
const router = express.Router();
const companyControllers = require('../controllers/company');
const validateInput = require('../middleware/validateInput');
const isAuthenticated = require('../middleware/isAuthenticated');

const { body } = require('express-validator');

router.put(
    '',
    [
        body('name')
            .trim()
            .not()
            .isEmpty(),
        body('email')
            .trim()
            .not()
            .isEmpty(),
        body('contact_number')
                .trim()
                .not()
                .isEmpty(),
        body('country_id')
                .trim()
                .not()
                .isEmpty(),
        body('business_type')
                .trim()
                .not()
                .isEmpty(),
        body('package')
                .trim()
                .not()
                .isEmpty(),
    ],
    isAuthenticated,
    validateInput,
    companyControllers.create
);

// Get company by id
router.get('/:id', isAuthenticated, companyControllers.get);

module.exports = router;
