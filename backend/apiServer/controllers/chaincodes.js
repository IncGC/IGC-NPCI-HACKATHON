const invokeTransaction = require("../app/invoke");
const {CHAINCODE_ACTIONS, CHAIN_CHANNEL, CHAINCODE_NAMES, getNow, CHAINCODE_CHANNEL, generateId}=require('../utils/helper');

exports.bond= async(req,res)=>{
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

        const bondData= {
            Id:"1234",
            CreatedOn:new Date(),
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

        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:bondData,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.BOND
        })

        console.log(message);
        res.status(201).json({
            status:201,
            message:bondData
        })

    }catch(err){
        res.send(err)
    }
}


exports.bondHoldings= async(req,res)=>{
    try{
        let{
            isin,
            mbeId,
            IssuerName,
            CouponRate,
            faceValue,
            CreditRating,
            MaturityDate,
            purchasePrice,
            numToken,
            currentPrice,
            numOfLots,
            tokenizedLot,
            totalTokenQty,
            RemainingToken
        }= req.body;

        const bondHoldingData={
            Id:"1234",
            CreatedOn:new Date(),
            CreatedBy: "admin",
            IsDelete:false,
            IsHidden:false,
            isin,
            mbeId,
            IssuerName,
            CouponRate,
            faceValue,
            CreditRating,
            MaturityDate,
            purchasePrice,
            numToken,
            currentPrice,
            numOfLots,
            tokenizedLot,
            totalTokenQty,
            RemainingToken
        }

        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:bondHoldingData,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.BONDHOLDING
        })

        console.log(message);
        res.status(201).json({
            status:201,
            message:bondHoldingData
        })
    }catch(err){
        res.send("err")
    }
}


exports.TokenHolding= async(req,res)=>{
    try{
        let {
            isin,
            mbeId,
            IssuerName,
            CouponRate,
            faceValue,
            Ltp,
            CreditRating,
            MaturityDate,
            latestBidPrice,
            latestAskPrice,
            purchasePrice,
            NumToken,
            currentPrice,
            numOfLots
        }= req.body;

        const TokenHoldingData={
            Id:"1234",
            CreatedOn:new Date(),
            CreatedBy: "admin",
            IsDelete:false,
            IsHidden:false,
            isin,
            mbeId,
            IssuerName,
            CouponRate,
            faceValue,
            Ltp,
            CreditRating,
            MaturityDate,
            latestBidPrice,
            latestAskPrice,
            purchasePrice,
            NumToken,
            currentPrice,
            numOfLots
        }

        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:TokenHoldingData,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.BONDHOLDING
        })
        console.log(message);
        res.status(201).json({
            status:201,
            message:TokenHoldingData
        })
    }catch(err){
        res.send(err)
    }
}

exports.Transactions = async(req,res)=>{
   try{
    let {
        trnxID,
        isin,
        userID,
        noOfTokens,
        date,
        type,
        status,
        authorization,
        amount,
        certificate
    } = req.body;

    const transactionData={
        Id:"1234",
        CreatedOn:new Date(),
        CreatedBy: "admin",
        IsDelete:false,
        IsHidden:false,
        trnxID,
        isin,
        userID,
        noOfTokens,
        date,
        type,
        status,
        authorization,
        amount,
        certificate
    }

    let message = await invokeTransaction({
        metaInfo:{userName:"pintu", org:"org1MSP"},
        chainCodeAction:CHAINCODE_ACTIONS.CREATE,
        channelName:CHAINCODE_CHANNEL,
        data:transactionData,
        chainCodeFunctionName:'create',
        chainCodeName:CHAINCODE_NAMES.TRASANSATIONS 
    })
    req.send(201).json({
        status:201,
        message:transactionData
    })
   }catch(err){
    res.send(err)
   }
}