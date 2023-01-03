const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    firstName: String,
    lastName: String,
    fatherName:String,
    Nationality: String,
    email: String,
    password: String,
    phoneNumber: String,
    gender:String,
    address:String,
    DOB:String,
    role: String,
    OrgMSP:String,
    status: String,
    phoneOtp:String,
    nse_registerd:Boolean,
    MbeId:String,
    bondholdingID: { type: ObjectId, ref: 'Bonds' },
    tokenholdingID:{type: ObjectId, ref :"Token"},
    transactionId: {type: ObjectId, ref : "Transaction"},
    cbdcBalance:{type:ObjectId, ref:"Wallet"},
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);