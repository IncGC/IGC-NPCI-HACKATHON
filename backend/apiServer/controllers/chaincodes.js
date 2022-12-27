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

exports.getbond = async(req,res)=>{
    try{
        let {
            isin
        }= req.body;

        let query = { selector: { isin } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.BOND,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })
        let data = JSON.parse(dataStr)

            console.log(data);
            res.status(200).json({
                status:200,
                message:data
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
            Id:generateId(),
            CreatedOn:getNow(),
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

exports.getbondHoldings = async(req,res)=>{
    try{
        let {
            isin
        }= req.body;

        let query = { selector: { isin } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.BONDHOLDING,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })
        console.log(message)

        let data = JSON.parse(dataStr)

            console.log(data);
            res.status(200).json({
                status:200,
                message:data
            })
    }catch(err){
        res.send(err)
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
            Id:generateId(),
            CreatedOn:getNow(),
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

exports.getTokenHolding = async(req,res)=>{
    try{
        let {
            isin
        }= req.body;

        let query = { selector: { isin } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.TOKENHOLDING,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })
        console.log(message)

        let data = JSON.parse(dataStr)

            console.log(data);
            res.status(200).json({
                status:200,
                message:data
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
        Id:generateId(),
        CreatedOn:getNow(),
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
    console.log(message)

    req.send(201).json({
        status:201,
        message:transactionData
    })
   }catch(err){
    res.send(err)
   }
}

exports.getTransaction = async(req,res)=>{
    try{
        let {
            isin
        }= req.body;

        let query = { selector: { isin } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.TRASANSATIONS,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })
        let data = JSON.parse(dataStr)

            console.log(data);
            res.status(200).json({
                status:200,
                message:data
            })
    }catch(err){
        res.send(err)
    }
}


exports.buyOrder= async(req, res)=>{
    try{

        let {
            mbeId,
            isin,
            price,
            noOfTokens
        } = req.body;

        const buyOrderData={
            Id:generateId(),
            CreatedOn:getNow(),
            CreatedBy: "admin",
            IsDelete:false,
            IsHidden:false,
            IsProcessed:false,
            mbeId,
            isin,
            price,
            noOfTokens
        }
        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:buyOrderData,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.BUYORDER 
        })

        console.log(message)
        req.send(201).json({
            status:201,
            message:buyOrderData
        })
    }catch(err){
        res.send(err)
    }
}



exports.getBuyOrder = async(req,res)=>{
    try{
        let {
            isin
        }= req.body;

        let query = { selector: { isin } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.BUYORDER,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })
        let data = JSON.parse(dataStr)

            console.log(data);

        res.status(200).json({
            status:200,
            message:data
        })
    }catch(err){
        res.send(err)
    }
}


exports.sellOrder= async(req, res)=>{
    try{

        let {
            mbeId,
            isin,
            price,
            noOfTokens
        } = req.body;

        const sellOrderData={
            Id:generateId(),
            CreatedOn:getNow(),
            CreatedBy: "admin",
            IsDelete:false,
            IsHidden:false,
            IsProcessed:false,
            mbeId,
            isin,
            price,
            noOfTokens
        }
        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:sellOrderData,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.SELLORDER 
        })

        console.log(message)
        req.send(201).json({
            status:201,
            message:sellOrderData
        })
    }catch(err){
        res.send(err)
    }
}

exports.getSellOrder= async(req,res)=>{
    try{
        let {
            isin
        }= req.body;

        let query = { selector: { isin } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.SELLORDER,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })
        let data = JSON.parse(dataStr)

            console.log(data);

        res.status(200).json({
            status:200,
            message:data
        })
    }catch(err){
        res.send(err)
    }
}
exports.mbeMarket= async(req,res)=>{
    try{
        let{
            isin,
            mbeId,
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
            numOfLots,
            tokenizedLot,
            totalTokenQty,
            RemainingToken,
            Detokenizedtoken,
            detokenizedValue,
        } = req.body;

        const marketData= {
            Id:generateId(),
            CreatedOn:getNow(),
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
            securityDescription,
            latestBidPrice,
            latestAskPrice,
            currency,
            numOfLots,
            tokenizedLot,
            totalTokenQty,
            RemainingToken,
            Detokenizedtoken,
            detokenizedValue,
        }

        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:marketData,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.MBEMARKET
        })

        console.log(message);
        res.status(201).json({
            status:201,
            message:marketData
        })

    }catch(err){
        res.send(err)
    }
}


exports.getMbeMarket= async(req,res)=>{
    try{
        let {
            isin
        }= req.body;

        let query = { selector: { isin } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.SELLORDER,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })
        let data = JSON.parse(dataStr)

            console.log(data);

        res.status(200).json({
            status:200,
            message:data
        })
    }catch(err){
        res.send(err)
    }
}
exports.purchaseLog= async(req,res)=>{
    try{



        let {
            mbeId,
            isin,
            price,
            noOfTokens,
            tradeValue  
        } = req.body;

        const purchaseLogData={
            Id:generateId(),
            CreatedOn:getNow(),
            CreatedBy: "admin",
            IsDelete:false,
            IsHidden:false,
            IsProcessed:false,
            IsAuthorize:false,
            IsPurchase: false,
            mbeId,
            isin,
            price,
            noOfTokens,
            tradeValue
        }
        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:purchaseLogData,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.PURCHASELOG 
        })

        console.log(message)
        req.send(201).json({
            status:201,
            message:purchaseLogData
        })
    }catch(err){
        res.send(err)
    }
}

exports.getPurchaseLog= async(req,res)=>{
    try{
        let {
            isin
        }= req.body;

        let query = { selector: { isin } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.PURCHASELOG,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })
        let data = JSON.parse(dataStr)

            console.log(data);

        res.status(200).json({
            status:200,
            message:data
        })
    }catch(err){
        res.send(err)
    }
}