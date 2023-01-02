const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const BondModel = new schema({
    Isin: String,
    IssuerName: String,
    CouponRate:String,
    Price: String,
    MaturityDate: String,
    Yield: String,
    Currency:String,
    NumOfToken: String,
    TokenValue: String     
}, { timestamps: true });

module.exports = mongoose.model('BondModel', BondModel);
