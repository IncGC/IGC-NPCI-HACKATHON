const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const TransactionsModel = new schema({
    trnxID: String,
    Isin: String,
    userID:String,
    NumOfToken: String,
    date: String,
    type: String,
    status: String,
    authorization:String,
    amount:String,
    certificate:String    
}, { timestamps: true });

module.exports = mongoose.model('TransactionsModel', TransactionsModel);