const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const BidModel = new schema({
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

module.exports = mongoose.model('BidModel', BidModel);
