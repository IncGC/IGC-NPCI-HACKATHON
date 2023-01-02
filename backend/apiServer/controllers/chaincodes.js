const { invokeTransaction } = require("../app/invoke");

const {
  CHAINCODE_ACTIONS,
  CHAINCODE_NAMES,
  getNow,
  CHAINCODE_CHANNEL,
  generateId,
} = require("../utils/helper");

const {
  Bonds,
  SellOrder,
  BuyOrder,
  Wallet,
  PurchaseLog,
} = require("../models/Trade");

exports.cbdcwallet = async (req, res) => {
  try{
    let{
      MbeId,
      CBDCbalance,
    } = req.body;
    const cbdcwalletData= {
      Id:generateId(),
      CreatedOn:getNow(),
      CreatedBy: "admin",
      IsDelete:"false",
      IsHidden:"false",
      IsUpdated:'false',
      MbeId,
      CBDCbalance
    }
console.log(cbdcwalletData);

    let message = await invokeTransaction({
        metaInfo:{userName:"pintu", org:"org1MSP"},
        chainCodeAction:'create',
        channelName:'common',
        data:cbdcwalletData,
        chainCodeFunctionName:'create',
        chainCodeName:'CBDCwallet'
    })
    console.log(message);

    const walletBalance = await Wallet.findOne({MbeId});

    if (walletBalance){
      let balance = parseFloat( walletBalance.CBDCbalance);
      let amount = parseFloat(req.body.CBDCbalance);
      const wallet = await Wallet.findOneAndUpdate({MbeId:email}, {$set:{CBDCbalance:(balance+amount)}})

    }

    res.status(201).json({
        status:201,
        message:message
    })

}catch(err){
    res.send(err)
}
};

exports.getcbdcwallet = async (req, res) => {
  try {
    let { MbeId } = req.query;

    let query = { selector: { MbeId } };

    let queryString = JSON.stringify(query);

    let dataStr = await invokeTransaction({
      metaInfo: { userName: 'pintu', org: 'org1MSP' },
      chainCodeAction: CHAINCODE_ACTIONS.GET,
      channelName: CHAINCODE_CHANNEL,
      data: queryString,
      chainCodeFunctionName: "querystring",
      chainCodeName: "CBDCwallet",
    });

    res.set("Content-Type", "application/json");
    // res.status(200).send(dataStr);
    let data = JSON.parse(dataStr)
    console.log(dataStr)

        console.log(data);
        res.status(200).json({
            status:200,
            message:data
        })
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.bondHoldings = async (req, res) => {
  try {
    let {
      Isin,
      MbeId,
      IssuerName,
      CouponRate,
      FaceValue,
      CreditRating,
      MaturityDate,
      PurchasePrice,
      NumOfToken,
      CurrentPrice,
      LotQty,
      TokenizedLot,
      TotalTokenQty,
      RemainingToken,
    } = req.body;

    console.log(req.body);
    const bondHoldingData = {
      Id: generateId(),
      CreatedOn: getNow(),
      CreatedBy: "admin",
      IsDelete: 'false',
      IsHidden: 'false',
      IsTokenized: 'false',
      IsProcessed: 'false',
      Isin,
      MbeId,
      IssuerName,
      CouponRate,
      FaceValue,
      CreditRating,
      MaturityDate,
      PurchasePrice,
      NumOfToken,
      CurrentPrice,
      LotQty,
      TokenizedLot,
      TotalTokenQty,
      RemainingToken,
    };

    console.log(bondHoldingData);
    let message = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: "create",
      channelName: "common",
      data: bondHoldingData,
      chainCodeFunctionName: "create",
      chainCodeName: "BondHolding",
    });
    console.log("hi ");
    console.log(message);
    res.status(201).json({
      status: 201,
      message: message,
    });
  } catch (err) {
    res.send("err");
  }
};

exports.getbondHoldings = async (req, res) => {
  try {
    let { Isin } = req.body;

    let query = { selector: { Isin } };

    let queryString = JSON.stringify(query);

    let dataStr = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.GET,
      channelName: CHAINCODE_CHANNEL,
      data: queryString,
      chainCodeFunctionName: "querystring",
      chainCodeName: "BondHolding",
    });

    res.set("Content-Type", "application/json");
    // res.status(200).send(dataStr);
    // console.log(message)

    let data = JSON.parse(dataStr);

    console.log(data);
    res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (err) {
    res.send("err");
  }
};

exports.TokenHolding = async (req, res) => {
  try {
    let {
      Isin,
      MbeId,
      IssuerName,
      CouponRate,
      FaceValue,
      Ltp,
      CreditRating,
      MaturityDate,
      LatestBidPrice,
      LatestAskPrice,
      PurchasePrice,
      NumOfToken,
      CurrentPrice,
      LotQty,
      DetokenizedTokens,
      DetokenizedValue
    } = req.body;

    const TokenHoldingData = {
      Id: generateId(),
      CreatedOn: getNow(),
      CreatedBy: "admin",
      IsDelete: 'false',
      IsHidden: 'false',
      Isin,
      MbeId,
      IssuerName,
      CouponRate,
      FaceValue,
      Ltp,
      CreditRating,
      MaturityDate,
      LatestBidPrice,
      LatestAskPrice,
      PurchasePrice,
      NumOfToken,
      CurrentPrice,
      LotQty,
      DetokenizedTokens,
      DetokenizedValue
    };

    console.log(TokenHoldingData);

    let message = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.CREATE,
      channelName: CHAINCODE_CHANNEL,
      data: TokenHoldingData,
      chainCodeFunctionName: "create",
      chainCodeName: CHAINCODE_NAMES.BONDHOLDING,
    });
    console.log(message);
    res.status(201).json({
      status: 201,
      message: message,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.getTokenHolding = async (req, res) => {
  try {
    let { Isin } = req.body;

    let query = { selector: { Isin } };
    let queryString = JSON.stringify(query);

    let dataStr = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.GET,
      chainCodeFunctionName: "querystring",
      chainCodeName: CHAINCODE_NAMES.TOKENHOLDING,
      channelName: CHAINCODE_CHANNEL,
      data: queryString,
    });
    // console.log(message)

    let data = JSON.parse(dataStr);

    console.log(data);
    res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.Transactions = async (req, res) => {
  try {
    let {
      Isin,
      MbeId,
      IssuerName,
      NumOfToken,
      Date,
      TransactionsType,
      Status,
      Amount,
      SellOrderId,
      BuyOrderId,
      PurchaselogId
    } = req.body;

    const transactionData = {
      Id: generateId(),
      CreatedOn: getNow(),
      CreatedBy: "admin",
      IsDelete: "false",
      IsHidden: "false",
      Isin,
      MbeId,
      IssuerName,
      NumOfToken,
      Date,
      TransactionsType,
      Status,
      Amount,
      SellOrderId,
      BuyOrderId,
      PurchaselogId
    };

    let message = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.CREATE,
      channelName: CHAINCODE_CHANNEL,
      data: transactionData,
      chainCodeFunctionName: "create",
      chainCodeName: CHAINCODE_NAMES.TRASANSATIONS,
    });
    console.log(message);

    res.status(201).json({
      status: 201,
      message: message,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.getTransaction = async (req, res) => {
  try {
    let { Isin } = req.query;

    let query = { selector: { Isin } };
    let queryString = JSON.stringify(query);

    let dataStr = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.GET,
      chainCodeFunctionName: "querystring",
      chainCodeName: CHAINCODE_NAMES.TRASANSATIONS,
      channelName: CHAINCODE_CHANNEL,
      data: queryString,
    });
    let data = JSON.parse(dataStr);

    console.log(data);
    res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.buyOrder = async (req, res) => {
  try {
    let { MbeId, Isin,    IssuerName,
      TransactionsType,Price, NumOfToken } = req.body;

    const buyOrderData = {
      Id: generateId(),
      CreatedOn: getNow(),
      CreatedBy: "admin",
      IsDelete: 'false',
      IsHidden: 'false',
      IsProcessed: 'false',
      MbeId,
      Isin,
      IssuerName,
      TransactionsType,
      Price,
      NumOfToken,
    };

    console.log(buyOrderData);

    let message = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.CREATE,
      channelName: CHAINCODE_CHANNEL,
      data: buyOrderData,
      chainCodeFunctionName: "create",
      chainCodeName: CHAINCODE_NAMES.BUYORDER,
    });

    console.log(message);
    res.status(201).json({
      status: 201,
      message: message
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.getBuyOrder = async (req, res) => {
  try {
    let { Isin } = req.query;

    let query = { selector: { Isin } };
    let queryString = JSON.stringify(query);

    let dataStr = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.GET,
      chainCodeFunctionName: "querystring",
      chainCodeName: CHAINCODE_NAMES.BUYORDER,
      channelName: CHAINCODE_CHANNEL,
      data: queryString,
    });
    let data = JSON.parse(dataStr);

    console.log(data);

    res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.sellOrder = async (req, res) => {
  try {
    let { MbeId, Isin,   IssuerName,
      TransactionsType, Price, NumOfToken } = req.body;

    const sellOrderData = {
      Id: generateId(),
      CreatedOn: getNow(),
      CreatedBy: "admin",
      IsDelete: 'false',
      IsHidden: 'false',
      IsProcessed: 'false',
      MbeId,
      Isin,
      IssuerName,
      TransactionsType,
      Price,
      NumOfToken,
    };

    console.log(sellOrderData);
    let message = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.CREATE,
      channelName: CHAINCODE_CHANNEL,
      data: sellOrderData,
      chainCodeFunctionName: "create",
      chainCodeName: CHAINCODE_NAMES.SELLORDER,
    });

    console.log(message);
    res.status(201).json({
      status: 201,
      message: message,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.getSellOrder = async (req, res) => {
  try {
    let { Isin } = req.query;

    let query = { selector: { Isin } };
    let queryString = JSON.stringify(query);

    let dataStr = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.GET,
      chainCodeFunctionName: "querystring",
      chainCodeName: CHAINCODE_NAMES.SELLORDER,
      channelName: CHAINCODE_CHANNEL,
      data: queryString,
    });
    let data = JSON.parse(dataStr);

    console.log(data);

    res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};
exports.mbeMarket = async (req, res) => {
  try {
    let {
      Isin,
      MbeId,
      IssuerName,
      CouponRate,
      FaceValue,
      Ltp,
      CreditRating,
      MaturityDate,
      SecurityDescription,
      LatestBidPrice,
      LatestAskPrice,
      Currency,
      LotQty,
      TokenizedLot,
      TotalTokenQty,
      RemainingToken,
      Detokenizedtoken,
      DetokenizedValue,
    } = req.body;

    const marketData = {
      Id: generateId(),
      CreatedOn: getNow(),
      CreatedBy: "admin",
      IsDelete: 'false',
      IsHidden: 'false',
      Isin,
      MbeId,
      IssuerName,
      CouponRate,
      FaceValue,
      Ltp,
      CreditRating,
      MaturityDate,
      SecurityDescription,
      LatestBidPrice,
      LatestAskPrice,
      Currency,
      LotQty,
      TokenizedLot,
      TotalTokenQty,
      RemainingToken,
      Detokenizedtoken,
      DetokenizedValue,
    };

    let message = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.CREATE,
      channelName: CHAINCODE_CHANNEL,
      data: marketData,
      chainCodeFunctionName: "create",
      chainCodeName: CHAINCODE_NAMES.MBEMARKET,
    });

    console.log(message);
    res.status(201).json({
      status: 201,
      message: message,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.getMbeMarket = async (req, res) => {
  try {
    let { Isin } = req.query;

    let query = { selector: { Isin } };
    let queryString = JSON.stringify(query);

    let dataStr = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.GET,
      chainCodeFunctionName: "querystring",
      chainCodeName: CHAINCODE_NAMES.SELLORDER,
      channelName: CHAINCODE_CHANNEL,
      data: queryString,
    });
    let data = JSON.parse(dataStr);

    console.log(data);

    res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};
exports.purchaseLog = async (req, res) => {
  try {
    let { MbeId, Isin, Price, NumOfToken, TradeValue } = req.body;

    const purchaseLogData = {
      Id: generateId(),
      CreatedOn: getNow(),
      CreatedBy: "admin",
      IsDelete: "false",
      IsHidden: "false",
      IsProcessed: "false",
      IsAuthorize: "false",
      IsPurchase: "false",
      MbeId,
      Isin,
      Price,
      NumOfToken,
      TradeValue,
    };
    let message = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.CREATE,
      channelName: CHAINCODE_CHANNEL,
      data: purchaseLogData,
      chainCodeFunctionName: "create",
      chainCodeName: CHAINCODE_NAMES.PURCHASELOG,
    });

    console.log(message);
    res.status(201).json({
      status: 201,
      message: message,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};

exports.getPurchaseLog = async (req, res) => {
  try {
    let { Isin } = req.query;

    let query = { selector: { Isin } };
    let queryString = JSON.stringify(query);

    let dataStr = await invokeTransaction({
      metaInfo: { userName: "pintu", org: "org1MSP" },
      chainCodeAction: CHAINCODE_ACTIONS.GET,
      chainCodeFunctionName: "querystring",
      chainCodeName: CHAINCODE_NAMES.PURCHASELOG,
      channelName: CHAINCODE_CHANNEL,
      data: queryString,
    });
    let data = JSON.parse(dataStr);

    console.log(data);

    res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (err) {
    res.json({
      status:404,
      message:"Unexpected Error"
    })
  }
};
