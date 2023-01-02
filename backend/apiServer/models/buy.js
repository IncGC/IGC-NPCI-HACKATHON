const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const BuyModel = new schema({
    Isin: String,
    IssuerName: String,
    CouponRate:String,
    Price:String,
    maturityRate:String,
    Yield:String,
    Currency:String,
    bondDetails:String,
    priceDetails: String,
    NumOfToken:String,
    TokenValue: String      
}, { timestamps: true });

module.exports = mongoose.model('BuyModel', BuyModel);
