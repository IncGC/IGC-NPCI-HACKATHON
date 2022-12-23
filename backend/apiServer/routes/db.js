const OrderBookModel = require('../models/orderBook');

const orderresult= OrderBookModel.findOne();

console.log(orderresult);