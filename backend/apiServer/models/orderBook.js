const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const orderBook = new schema({
    MBEid: String,
    ISINnum: String,
    OrderId: String,
    orderType:String,
    quantity: String,
    price: String,
    Date: String,
    CBDCbalance:String,
    tokenBalance:String,

    // createdBy: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderBook);