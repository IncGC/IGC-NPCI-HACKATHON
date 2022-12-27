const BondModel = require("../models/Bond");
const{ invokeTransaction }= require("../app/invoke");

const moment = require('moment');

const generateId = require('../utils/helper');


exports.BondAPI= async(req,res)=>{
    try{
        let{
            isin,
            IssuerName,
            CouponRate,
            faceValue,
            Ltp,
            CreditRating,
            MaturityDate,
            securityDescription,
            latestBidPrice,
            latestAskPrice,
            currency,
            NumToken,
            Detokenizedtoken,
            detokenizedValue,
            tradeValue
        } = req.body;
        console.log(req.body)
        const bondData= {
            Id:generateId(),
            CreatedOn:getNow(),
            CreatedBy: "admin",
            IsDelete:false,
            IsHidden:false,
            isin,
            IssuerName,
            CouponRate,
            faceValue,
            Ltp,
            CreditRating,
            MaturityDate,
            securityDescription,
            latestBidPrice,
            latestAskPrice,
            currency,
            NumToken,
            Detokenizedtoken,
            detokenizedValue,
            tradeValue
        }
console.log(bondData);
        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:'create',
            channelName:'common',
            data:bondData,
            chainCodeFunctionName:'create',
            chainCodeName:'Bond'
        })
console.log('hereee')
        console.log(message);
        res.status(201).json({
            status:201,
            message:bondData
        })

    }catch(err){
        res.send(err)
    }
}

exports.BondAPIGet= async(req,res)=>{
    try{
        let { isin }=req.body;
        BondResult = await BondModel.findById({_id})

        res.status(200).json({
            status:200,
            message:BondResult
        })
    } catch(err){
        res.send(err)
    }
}