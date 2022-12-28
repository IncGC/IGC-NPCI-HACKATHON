const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const NseData = new schema({
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
    panCard:String,
    aadharCard: String,    
}, { timestamps: true });

module.exports = mongoose.model('Nse', NseData);