const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const ListingModel = new schema({
    isin: String,
    issuerName: String,
    couponName:String,
    price: String,
    maturityDate: String,
    yield: String,
    currency: String,
    noOfTokens:String,
    faceValue:String,
    ltp:String,
    bidPrice:String,
    askPrice: String,
    type:String,
    currPrice: String,      
}, { timestamps: true });

module.exports = mongoose.model('ListingModel', ListingModel);