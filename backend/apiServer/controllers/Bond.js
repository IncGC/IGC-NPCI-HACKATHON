const BondModel = require("../models/Bond");
const{ invokeTransaction }= require("../app/invoke");

const moment = require('moment');

const generateId = require('../utils/helper');


exports.BondAPI= async(req,res)=>{
    try{
        // let {
        //     isin,
        //     issuerName,
        //     couponRate,
        //     price,
        //     maturityDate,
        //     yield,
        //     currency,
        //     noOfTokens,
        //     tokenValue
        // }= req.body;



        let {
            isin,
            IssuerName,
            CouponRate,
            Price,
            MaturityDate,
            yield,
            Currency,
            NoOfTokens,
            TokenValue,
          } = req.body;


        // let BondData= {
        //     isin,
        //     issuerName,
        //     couponRate,
        //     price,
        //     maturityDate,
        //     yield,
        //     currency,
        //     noOfTokens,
        //     tokenValue
        // }


        let data = {
            Id:"1234567",
            CreatedOn: new Date(),
            CreatedBy:"Admin",
            IsDelete: false,
            IsHidden: false,
          isin,
          IssuerName,
          CouponRate,
          Price,
          MaturityDate,
          yield,
          Currency,
          NoOfTokens,
          TokenValue,
        };
        console.log(req.body)

        console.log(data);
        // let BondResult = await BondModel.create({BondData});

        // await BondResult.save();

        let chaincode = await invokeTransaction({
            metaInfo:{
                userName:"pintu", org:"org1MSP"
            },
            chainCodeAction:"create",
            channelName: "common",
            data:data,
            chainCodeFunctionName:"create",
            chainCodeName:"Bond"
        })

        console.log(chaincode);

        res.status(200).json({
            status:200,
            message:"Record Saved successfully !",
            // Bond:BondResult
        })
    }catch(err){
        res.send("err")
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