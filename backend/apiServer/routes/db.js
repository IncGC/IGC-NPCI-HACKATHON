const OrderBookModel = require('../models/orderBook');



let orderr= async()=>{
    let query = {
        MBEid:"4231"
    }
    const orderresult= await OrderBookModel.findOne({query});

    console.log(orderresult)

}


console.log(orderr());
const PanCardModel = require('../models/PanCard')
const panCarddata= PanCardModel.findOne({panCard:"DVPR1438"})
console.log(panCarddata)