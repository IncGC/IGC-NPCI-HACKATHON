const tokenizeModel = require("../models/tokenize");
const{ invokeTransaction }= require("../app/invoke");

const moment = require('moment');

const generateId = require('../utils/helper');


exports.tokenizeAPI= async(req,res)=>{
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


        // let tokenizeData= {
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
        // let tokenizeResult = await tokenizeModel.create({tokenizeData});

        // await tokenizeResult.save();

        let chaincode = await invokeTransaction({
            metaInfo:{
                userName:"pintu", org:"org1MSP"
            },
            chainCodeAction:"create",
            channelName: "common",
            data:data,
            chainCodeFunctionName:"create",
            chainCodeName:"Tokenize"
        })

        console.log(chaincode);

        res.status(200).json({
            status:200,
            message:"Record Saved successfully !",
            // tokenize:tokenizeResult
        })
    }catch(err){
        res.send("err")
    }
}

exports.tokenizeAPIGet= async(req,res)=>{
    try{
        let { isin }=req.body;
        tokenizeResult = await tokenizeModel.findById({_id})

        res.status(200).json({
            status:200,
            message:tokenizeResult
        })
    } catch(err){
        res.send(err)
    }
}