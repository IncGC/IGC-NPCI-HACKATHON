const buyModel= require("../models/buy");

exports.buypost=async(req,res)=>{
    try{
       let {
        Isin,
        IssuerName,
        CouponRate,
        Price,
        MaturityDate,
        Yield,
        NumOfToken,
        Currency,
        ReqTokens,
        TokenValue
       } = req.body;

       const buyData = {
        Isin,
        IssuerName,
        CouponRate,
        Price,
        MaturityDate,
        Yield,
        NumOfToken,
        Currency,
        ReqTokens,
        TokenValue
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
            Isin
        }= req.body;

        const buyResult = await buyModel.findOne({Isin});

       res.status(200).json({
        status:200,
        message:buyResult
       })
    }catch(err){
        res.send(err)
    }
}