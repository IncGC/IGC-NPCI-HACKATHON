const bidModel= require("../models/bid");

exports.bidpost=async(req,res)=>{
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

       const bidData = {
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
            Isin
        }= req.body;

        const bidResult = await bidModel.findOne({Isin});

       res.status(200).json({
        status:200,
        message:bidResult
       })
    }catch(err){
        res.send(err)
    }
}