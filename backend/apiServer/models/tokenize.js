const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const TokenizeModel = new schema({
    isin: String,
    issuerName: String,
    couponRate:String,
    price: String,
    maturityDate: String,
    yield: String,
    currency:String,
    noOfTokens: String,
    tokenValue: String     
}, { timestamps: true });

module.exports = mongoose.model('TokenizeModel', TokenizeModel);
