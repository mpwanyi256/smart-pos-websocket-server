const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    All POS users belong to a company, each comapny is the main user ID
*/
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date_joined: {
        type: Schema.Types.Date,
        default: Schema.Types.Date.now,
    },
    contact_number: {
        type: String,
        default: ''
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    business_type: {
        type: Number,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Company', companySchema);
