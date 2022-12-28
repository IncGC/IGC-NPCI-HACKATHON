const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const BuyModel = new schema({
    isin: String,
    issuerName: String,
    couponRate:String,
    price:String,
    maturityRate:String,
    yield:String,
    currency:String,
    bondDetails:String,
    priceDetails: String,
    noOfTokens:String,
    tokenValue: String      
}, { timestamps: true });

module.exports = mongoose.model('BuyModel', BuyModel);
