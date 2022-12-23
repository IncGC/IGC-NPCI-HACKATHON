const HoldingModel = require("../models/holdings");

exports.holdingAPI= async(req,res)=>{
    try{
        let {
            holdingID,
            userID,
            isin,
            noOfTokens,
        }= req.body;

        let holdingData= {
            holdingID,
            userID,
            isin,
            noOfTokens,
        }


        let holdingResult = await HoldingModel.create({holdingData});

        await holdingResult.save();

        res.status(200).json({
            status:200,
            message:"Record Saved successfully !",
            holding:holdingResult
        })
    }catch(err){
        res.send(err)
    }
}

exports.holdingAPIGet= async(req,res)=>{
    try{
        let { holdingID}=req.body;
        holdingResult = await HoldingModel.findOne({holdingID})

        res.status(200).json({
            status:200,
            message:"holdingResult"
        })
    } catch(err){
        res.send(err)
    }
}