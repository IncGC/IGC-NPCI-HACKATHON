const buyModel= require("../models/buy");

exports.buypost=async(req,res)=>{
    try{
       let {
        isin,
        issuerName,
        couponRate,
        price,
        maturityDate,
        yield,
        noOfTokens,
        currency,
        reqTokens,
        tokenValue
       } = req.body;

       const buyData = {
        isin,
        issuerName,
        couponRate,
        price,
        maturityDate,
        yield,
        noOfTokens,
        currency,
        reqTokens,
        tokenValue
       }

       const buyResult = await buyModel.create({buyData});

       res.status(200).json({
        status:200,
        message:buyResult
       })
    }catch(err){
        res.send(err)
    }
}

exports.buyGet = async(req,res)=>{
    try{
        let{
            isin
        }= req.body;

        const buyResult = await buyModel.findOne({isin});

       res.status(200).json({
        status:200,
        message:buyResult
       })
    }catch(err){
        res.send(err)
    }
}