const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, Boolean, Number } = mongoose.Schema.Types;

const organizationSchema = new schema({
    companyName: String,
    companySize: Number,
    country: String,
    state: String,
    licenseKey: String,
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);