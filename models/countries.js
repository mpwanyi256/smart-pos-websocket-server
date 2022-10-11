const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// A list of all supported countries
const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Country', countrySchema);
