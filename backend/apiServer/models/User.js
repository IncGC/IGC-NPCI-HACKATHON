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
    mbe_id:String,
    bondholdingID: { type: mongoose.Schema.ObjectId, ref: 'Bonds' },
    tokenholdingID:{type: mongoose.Schema.ObjectId, ref :"Token"},
    transactionId: {type: mongoose.Schema.ObjectId, ref : "Transaction"},
    cbdcBalance:String,
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);