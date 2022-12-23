const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const AskModel = new schema({
    isin: String,
    issuerName: String,
    couponRate:String,
    price: String,
    maturityDate: String,
    yield: String,
    noOfTokens: String,
    currency:String,
    reqTokens: String,
    tokenValue: String     
}, { timestamps: true });

module.exports = mongoose.model('AskModel', AskModel);
