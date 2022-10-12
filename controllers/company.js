const Company = require('../models/company');
const Country = require('../models/countries');

exports.create = (req, res, next) => {
    const { name, email, contact_number, country_id, business_type, package } = req.body;

    // validate country
    Country.findById(country_id)
        .then(results => {
            if (!results) {
                const err = new Error('Country not supported');
                err.statusCode = 500;
                throw err;
            }
            return Company.findOne({ email })
        })
        .then(companyFound => {
            if (companyFound) {
                const err = new Error('Email address already taken');
                err.statusCode = 500;
                throw err;
            }

            const company = new Company({
                name,
                email,
                contact_number,
                country_id,
                business_type,
                package,
            })
            return company.save()
        })
        .then(result => {
            res.status(201).json({
                message: 'Created',
                data: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.get = (req, res, next) => {
    const companyId = req.params.id;

    Company.findById(companyId)
        .then(result => {
            res.status(200).json({
                data: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}