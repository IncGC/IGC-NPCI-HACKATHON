const mongoose = require('mongoose');

const { mongoURI } = require('./keys')

module.exports = async function connectDB(){
    try{
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    }catch(err){
        console.error(err);
    }
}