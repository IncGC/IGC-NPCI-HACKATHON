const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const HoldingsModel = new schema({
    holdingID: String,
    userID: String,
    isin:String,
    noOfTokens: String   
}, { timestamps: true });

module.exports = mongoose.model('HoldingsModel', HoldingsModel);