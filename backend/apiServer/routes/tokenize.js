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
  try {
    console.log("hiiiiiiiiii")
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
    console.log("data"+ req.body)
    console.log("hiiiiiiiiii")

    let id = generateId()
    console.log("wewehiiiiiiiiii")

    var created_on = moment(new Date()).format();
    console.log("dfghjkhiiiiiiiiii")
    
    let data = {
        Id:id,
        CreatedOn: created_on,
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
    let message = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.CREATE,
      channelName: CHAINCODE_CHANNEL,
      data: data,
      chainCodeFunctionName: "create",
      chainCodeName: CHAINCODE_NAMES.TOKENIZE,
    });
    console.log(message);
    res.status(201).json({
        status:200,
        message:message
    });
  } catch (err) {
    res.send("err");
  }
});

module.exports = router;
