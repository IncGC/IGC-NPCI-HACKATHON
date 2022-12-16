const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    role: String,
    status: String,
    organization: { type: ObjectId, ref: 'Organization' },
    createdBy: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);