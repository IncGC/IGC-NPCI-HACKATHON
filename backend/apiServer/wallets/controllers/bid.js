const bidModel= require("../models/bid");

exports.bidpost=async(req,res)=>{
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

       const bidData = {
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

       const bidResult = await bidModel.create({bidData});

       res.status(200).json({
        status:200,
        message:bidResult
       })
    }catch(err){
        res.send(err)
    }
}

exports.bidGet = async(req,res)=>{
    try{
        let{
            isin
        }= req.body;

        const bidResult = await bidModel.findOne({isin});

       res.status(200).json({
        status:200,
        message:bidResult
       })
    }catch(err){
        res.send(err)
    }
}