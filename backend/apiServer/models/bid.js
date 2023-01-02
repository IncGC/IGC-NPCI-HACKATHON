const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const BidModel = new schema({
    Isin: String,
    IssuerName: String,
    CouponRate:String,
    Price: String,
    MaturityDate: String,
    Yield: String,
    NumOfToken: String,
    Currency:String,
    ReqTokens: String,
    TokenValue: String     
}, { timestamps: true });

module.exports = mongoose.model('BidModel', BidModel);
