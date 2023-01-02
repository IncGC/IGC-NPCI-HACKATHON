const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const orderBook = new schema({
    MbeId: String,
    ISINnum: String,
    IssuerName:String,
    CouponRate:String,
    MaturityDate:String,
    Yield:String,
    Currency:String,
    ReqToken:String,
    PricePerToken:String,
    orderType:String,
    Price: String,
    CBDCbalance:String,
    NumOfToken:String,
    // createdBy: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderBook);