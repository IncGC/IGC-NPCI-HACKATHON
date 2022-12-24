const AskModel= require("../models/ask");

exports.askpost=async(req,res)=>{
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

       const askData = {
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
            isin
        }= req.body;

        const askResult = await AskModel.findOne({isin});

        console.log(askResult);

       res.status(200).json({
        status:200,
        message:askResult
       })
    }catch(err){
        res.send(err)
    }
}