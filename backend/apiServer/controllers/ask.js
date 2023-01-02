const AskModel= require("../models/ask");

exports.askpost=async(req,res)=>{
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

       const askData = {
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
       console.log(askData)
       const askResult = await AskModel.create(askData);

       await askResult.save();

       res.status(200).json({
        status:200,
        message:askResult
       })
    }catch(err){
        res.send(err)
    }
}

exports.askGet = async(req,res)=>{
    try{
        let{
            Isin
        }= req.body;

        const askResult = await AskModel.findOne({Isin});

        console.log(askResult);

       res.status(200).json({
        status:200,
        message:askResult
       })
    }catch(err){
        res.send(err)
    }
}