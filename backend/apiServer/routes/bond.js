const router = require("express").Router();

const { HandleError } = require("../utils/HandleResponseError");
const {
  CHAINCODE_ACTIONS,
  CHAIN_CHANNEL,
  CHAINCODE_NAMES,
  getNow,
  CHAINCODE_CHANNEL,
  generateId,
} = require("../utils/helper");
const moment = require('moment')
const { invokeTransaction } = require("../app/invoke");

router.post("/liveMarket", async (req, res) => {
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
          id:generateId(),
          createdOn:getNow(),
          createdBy: "admin",
          isDelete:"false",
          isHidden:"false",
          isin,
          issuerName:IssuerName,
          couponRate:CouponRate,
          faceValue,
          ltp:Ltp,
          creditRating:CreditRating,
          maturityDate:MaturityDate,
          securityDescription,
          latestBidPrice,
          latestAskPrice,
          currency,
          numToken:NumToken,
          detokenizedtoken:Detokenizedtoken,
          detokenizedValue,
          tradeValue
        }
console.log(bondData);
console.log('hereee')

        let message = await invokeTransaction({
            metaInfo:{userName:"pintu", org:"org1MSP"},
            chainCodeAction:'create',
            channelName:'common',
            data:bondData,
            chainCodeFunctionName:'create',
            chainCodeName:'Bond'
        })
// console.log('hereee')
        console.log(message);
        res.status(201).json({
            status:201,
            message:message
        })

    }catch(err){
        res.send(err)
    }
});

module.exports = router;
