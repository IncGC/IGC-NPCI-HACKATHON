const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const orderBook = new schema({
    MBEid: String,
    ISINnum: String,
    IssuerName:String,
    CouponRate:String,
    MaturityDate:String,
    yield:String,
    currency:String,
    ReqToken:String,
    PricePerToken:String,
    orderType:String,
    price: String,
    CBDCbalance:String,
    NumOfToken:String,
    // createdBy: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderBook);