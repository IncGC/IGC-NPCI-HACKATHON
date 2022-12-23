const OrderBookModel = require('../models/orderBook');

exports.orderbook = async(req,res)=>{
    try {
        let{ MBEid, ISINnum,IssuerName, CouponRate, MaturityDate,yield,currency,ReqToken,PricePerToken , orderType,price,CBDCbalance,NumOfToken }= req.body;

        const orderData={
            MBEid, ISINnum,IssuerName, CouponRate, MaturityDate,yield,currency,ReqToken,PricePerToken , orderType,price,CBDCbalance,NumOfToken }

        const orderBook = await OrderBookModel.create(orderData);

        res.status(200).json({
            status:200,
            message:orderBook
        })
    } catch(err){
        res.send(err)
    }
}

exports.orderbookget= async(req, res)=>{
    try {
        let {OrderId}= req.body;
        const orderbookresult = await OrderBookModel.findOne({OrderId})

        res.status(200).json({
            status:200,
            message:orderbookresult
        })
    }catch (err){
        res.send(err)
    }
}