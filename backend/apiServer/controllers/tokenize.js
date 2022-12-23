const tokenizeModel = require("../models/tokenize");

exports.tokenizeAPI= async(req,res)=>{
    try{
        let {
            isin,
            issuerName,
            couponRate,
            price,
            maturityDate,
            yield,
            currency,
            noOfTokens,
            tokenValue
        }= req.body;

        let tokenizeData= {
            isin,
            issuerName,
            couponRate,
            price,
            maturityDate,
            yield,
            currency,
            noOfTokens,
            tokenValue
        }


        let tokenizeResult = await tokenizeModel.create({tokenizeData});

        await tokenizeResult.save();

        res.status(200).json({
            status:200,
            message:"Record Saved successfully !",
            tokenize:tokenizeResult
        })
    }catch(err){
        res.send(err)
    }
}

exports.tokenizeAPIGet= async(req,res)=>{
    try{
        let { isin }=req.body;
        tokenizeResult = await tokenizeModel.findOne({isin})

        res.status(200).json({
            status:200,
            message:"tokenizeResult"
        })
    } catch(err){
        res.send(err)
    }
}