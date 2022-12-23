const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const OrgModel = new schema({
    orgID: String,
    marketOpen: String   
}, { timestamps: true });

module.exports = mongoose.model('OrgModel', OrgModel);