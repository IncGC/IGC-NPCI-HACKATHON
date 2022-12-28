const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const panCard = new schema({
    firstName: String,
    lastName: String,
    fatherName:String,
    Nationality: String,
    phoneNumber: String,
    email:String,
    gender:String,
    address:String,
    DOB:String,
    panCard:String,
    aadharCard: String,   
}, { timestamps: true });

module.exports = mongoose.model('PanCard', panCard);