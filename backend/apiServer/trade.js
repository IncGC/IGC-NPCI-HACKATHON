const fs = require("fs");
const { parse } = require("csv-parse");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport')

//READ Trade Schema
const {
  Bonds,
  SellOrder,
  BuyOrder,
  Wallet,
  PurchaseLog,
} = require("./models/Trade");

//MatchOrder function
const {
  CompareLimitOrder,
  VerifyBuyOrderList,
  VerifySellOrderList,
  storeRecord,
} = require("./config/helper");
const { setEngine } = require("crypto");
const { findOneAndUpdate, findOne } = require("./models/User");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

//API Endpoint to read file and push data
app.post("/pushBondDetails", async (req, res) => {
  try {
    async function readFile() {
      fs.createReadStream("./data/bondData.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", async function (row) {
          let obj = {
            // "Isin": row[0],
            Isin: row[0],
            MbeId: row[1],
            IssuerName: row[2],
            CouponRate: row[3],
            FaceValue: row[4],
            Ltp: row[5],
            CreditRating: row[6],
            MaturityDate: row[7],
            SecurityDescription: row[8],
            Currency: row[9],
            LotQty: row[10],
            TokenizedLot: row[11],
            TotalTokenQty: row[12],
            TokenQtyRemaining: row[13],
          };
          let record = new Bonds(obj);
          record.save();
        })
        .on("end", function () {
          console.log("end");
        });
    }
    readFile();
    // res.send("Succesfully Pushed");
    let recordData = await Bonds.find();
    res.status(201).json({
      status: 201,
      message: recordData,
    });
  } catch (e) {
    res.status(404).json({
      status:404,
      message:"Not Found"
    });
  }
});

app.post("/pushSellorders", async (req, res) => {
  try {
    async function readFile() {
      fs.createReadStream("./data/sellOrder.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", async function (row) {
          let obj = {
            OrderId: row[0],
            MbeId: row[1],
            Isin: row[2],
            IssuerName: row[3],
            TransactionsType: row[4],
            NumOfToken: row[5],
            Price: row[6]
          };
          let record = new SellOrder(obj);
          record.save();
        })
        .on("end", function () {
          console.log("end");
        });
    }
    readFile();
    // res.send("Succesfully Pushed");
    let pushSellData= await SellOrder.find()

    res.status(201).json({
        status:201,
        message:pushSellData
    })
  } catch (e) {
    res.json({
      status:404,
      message:"Not found"
    });
  }
});

app.post("/pushBuyorders", async (req, res) => {
  try {
    async function readFile() {
      fs.createReadStream("./data/buyOrder.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", async function (row) {
          let obj = {
            OrderId: row[0],
            MbeId: row[1],
            Isin: row[2],
            IssuerName: row[3],
            TransactionsType: row[4],
            NumOfToken: row[5],
            Price:row[6]
          };
          let record = new BuyOrder(obj);
          record.save();
        })
        .on("end", function () {
          console.log("end");
        });
    }
    readFile();
    // res.send("Succesfully Pushed");
   let buyOrderData = await BuyOrder.find();

   res.status(200).json({
    status:200,
    message:buyOrderData
   })
  } catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

app.post("/pushWallets", async (req, res) => {
  try {
    async function readFile() {
      fs.createReadStream("./data/wallet.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", async function (row) {
          let obj = {
            MbeId: row[0],
            CBDCbalance: row[1],
          };
          let record = new Wallet(obj);
          record.save();


        })
        .on("end", function () {
          console.log("end");
        });
    }
    readFile();
    // res.send("Succesfully Pushed");
    let walletData = await Wallet.find();
    res.status(201).json({
      status: 201,
      message: walletData,
    });
  } catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

const TransactionsModel = require('./models/transactions');

app.post("/tokenize", async (req, res) => {
  try {
    let bondDetails = await Bonds.find({
      Isin: req.body.Isin,
      MbeId: req.body.MbeId,
    });
    console.log("bondDetails", bondDetails);
    if (
      parseFloat(bondDetails[0].LotQty) > 0 &&
      parseFloat(bondDetails[0].LotQty) >= parseFloat(req.body.LotNumber)
    ) {
      let _tokenizedLot =
        parseFloat(bondDetails[0].TokenizedLot) +
        parseFloat(req.body.LotNumber);
      let _newLotQty =
        parseFloat(bondDetails[0].LotQty) - parseFloat(req.body.LotNumber);
      let _totalTokenQty =
        parseFloat(bondDetails[0].TotalTokenQty) +
        parseFloat(req.body.TotalTokenQty);
      let _TokenQtyRemaining =
        parseFloat(bondDetails[0].TokenQtyRemaining) +
        parseFloat(req.body.TotalTokenQty);

        console.log(bondDetails[0])
        console.log( req.body.TotalTokenQty)
      let obj = await Bonds.findOneAndUpdate(
        { MbeId: req.body.MbeId, Isin: req.body.Isin },
        {
          $set: {
            TokenizedLot: _tokenizedLot,
            LotQty: _newLotQty,
            IsTokenized: true,
            TotalTokenQty: _totalTokenQty,
            TokenQtyRemaining:_TokenQtyRemaining,
          },
        },
        { upsert: true }
      );
      // console.log("Iam here");

      console.log({
        TokenizedLot: _tokenizedLot,
        LotQty: _newLotQty,
        IsTokenized: true,
        TotalTokenQty:( _totalTokenQty),
        TokenQtyRemaining:_TokenQtyRemaining,
      })
      if (obj) {
        res.json({
          status:200,
          message:"Successfully Tokenized"
        });
      }
    } else {
      res.json({
        status:400,
        message:"No Sufficient Lot to Tokenized"
      });
    }
  } catch (e) {
     res.json({
      status:400,
      message:"Not found"
    }); 
  }
});

app.post("/deTokenize", async (req, res) => {
  try {
    let bondDetails = await Bonds.find({
      Isin: req.body.Isin,
      MbeId: req.body.MbeId,
    });
    console.log("bondDetails", bondDetails);
    if (
      parseFloat(bondDetails[0].TotalTokenQty) >= 200000 &&
      parseFloat(req.body.tokenQty) >= 200000
    ) {
      let _lotQty = parseFloat(req.body.tokenQty) / 200000;
      let _newLotQty = parseFloat(bondDetails[0].LotQty) + _lotQty;
      let _newTokenizedLot = parseFloat(bondDetails[0].TokenizedLot) - _lotQty;
      let _newTotalTokenQty =
        parseFloat(bondDetails[0].TotalTokenQty) -
        parseFloat(req.body.tokenQty);
      console.log(
        "_lotQty",
        _lotQty,
        _newLotQty,
        _newTokenizedLot,
        _newTotalTokenQty
      );
      let obj = await Bonds.findOneAndUpdate(
        { MbeId: req.body.MbeId, Isin: req.body.Isin },
        {
          $set: {
            TokenizedLot: _newTokenizedLot,
            LotQty: _newLotQty,
            TotalTokenQty: _newTotalTokenQty,
          },
        },
        { upsert: true }
      );
      if (obj) {
        res.status(200).json({
          status:200,
          message:"Successfully DeTokenized"
        });
      }
    } else {
      res.status(200).json({
        status:400,
        message:"No Sufficient Token to DeTokenized"
      });
    }
  } catch (e) {
     res.json({
      status:400,
      message:"Not found"
    }); 
  }
});

app.get('/detokenizedtoken', async(req,res)=>{
  try{
    const{
      MbeId,
      Isin
    } = req.query;

    console.log("MbeId:",MbeId,"isin:",Isin);
    const bondData = await Bonds.findOne({MbeId, Isin});

    console.log(bondData);

    const detokenizedtoken = parseFloat(bondData.TokenQtyRemaining)-parseFloat(bondData.TotalTokenQty);

    console.log(detokenizedtoken);

    res.status(200).json({
      status:200,
      message:detokenizedtoken
    })

  }catch (e) {
     res.json({
      status:400,
      message:"Not found"
    }); 
  }
})



//IN PROGRESS
app.post("/convertToBond", async (req, res) => {
  try {
  } catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

app.post("/placeSellOrder", async (req, res) => {
  try {
    let bondDetails = await Bonds.find({
      Isin: req.body.Isin,
      MbeId: req.body.MbeId,
    });
    console.log("bondDetails", bondDetails);
    if (
      parseFloat(bondDetails[0].TokenQtyRemaining) >=
      parseFloat(req.body.NumOfToken)
    ) {
      let sellorder = [
        {
          OrderId: req.body.OrderId,
          MbeId: req.body.MbeId,
          Isin: req.body.Isin,
          NumOfToken: req.body.NumOfToken,
          Price: req.body.Price,
        },
      ];
      let bArray = [];
      let buyOrderBook = await BuyOrder.findOne({
        Isin: req.body.Isin,
        NumOfToken: req.body.NumOfToken,
        Price: req.body.Price,
        IsProcessed: false,
      });
      bArray.push(buyOrderBook);
      console.log("sellorder", sellorder, buyOrderBook);

      if (Object.keys(buyOrderBook || {}).length > 0) {
        await VerifyBuyOrderList(sellorder, bArray);
        res.json(
          "Successfully Placed Sell Order. Match found and processed your order"
        );
      } else {
        let obj = {
          OrderId: req.body.OrderId,
          MbeId: req.body.MbeId,
          Isin: req.body.Isin,
          NumOfToken: req.body.NumOfToken,
          Price: req.body.Price,
        };
        await storeRecord("Sell", obj);
        // res.json("Successfully Placed Sell Order");

        const SellOrderData = await SellOrder.find();


        console.log(SellOrderData);

        res.status(200).json({
          status: 200,
          message: "Successfully Placed Sell Order",
        });
      }
    } else {
      res.json({
        status:200,
        message:"No Sufficient Token to place sell order"
      });
    }
  } catch (e) {
     res.json({
      status:400,
      message:"Not found"
    }); 
  }
});

app.post("/placeBuyOrder", async (req, res) => {
  try {
    let walletBalance = await Wallet.find({ MbeId: req.body.MbeId });
    console.log(walletBalance);
       if (
      parseFloat(walletBalance[0].CBDCbalance) >=
      parseFloat(req.body.Price) * parseFloat(req.body.NumOfToken)
    ) {
      let buyorder = [
        {
          OrderId: req.body.OrderId,
          MbeId: req.body.MbeId,
          Isin: req.body.Isin,
          NumOfToken: req.body.NumOfToken,
          Price: req.body.Price,
        },
      ];
      console.log("buyorder", buyorder);

      let sArray = [];
      let sellorderBook = await SellOrder.findOne({
        Isin: req.body.Isin,
        NumOfToken: req.body.NumOfToken,
        Price: req.body.Price,
        IsProcessed: false,
      });
      console.log(sellorderBook);
      sArray.push(sellorderBook);
      console.log("buyorder", buyorder, sellorderBook, sArray);

      if (Object.keys(sellorderBook || {}).length > 0) {
        await VerifySellOrderList(buyorder, sArray);
        res.json(
          {
            status:200,
            message:"Successfully Placed Buy Order. Match found and processed your order"
          }
        );
      } else {
        let obj = {
          OrderId: req.body.OrderId,
          MbeId: req.body.MbeId,
          Isin: req.body.Isin,
          NumOfToken: req.body.NumOfToken,
          Price: req.body.Price,
        };
        await storeRecord("Buy", obj);

        let buyData = await BuyOrder.find()
        let sellData = await SellOrder.find()

        res.status(200).json({
          status:200,
          message:"Succesfully placed Buy Order"
        })
        // res.json("Successfully Placed Buy Order");


      }
    } else {
      res.json({
        status:400,
        message:"No Sufficient Balance"
      });
    }
  } catch (e) {
    console.log("e", e);
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

app.get("/compareOrderBook", async (req, res) => {
  try {
    let buyorderBook = await BuyOrder.find({ IsProcessed: false });
    let sellOrderBook = await SellOrder.find({ IsProcessed: false });
    await CompareLimitOrder(sellOrderBook, buyorderBook, false);
  } catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

app.get("/purchaselog", async(req,res)=>{
  try{
      let purchaseLogData= await PurchaseLog.find();

      res.status(200).json({
        status:200,
        message:purchaseLogData
      })

  }catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
})


app.get("/balance", async(req,res)=>{
  try{
      let balanceData= await Wallet.findOne({MbeId:req.query.MbeId});
      res.status(200).json({
        status:200,
        message:balanceData
      })

  }catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
})


app.get('/balanceAll',async(req,res)=>{
  try{
    let balanceAll= await Wallet.find();

    res.status(200).json({
      status:200,
      message:balanceAll
    })
  }catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
})
app.get('/buyOrder', async(req, res)=>{
  try{
      let buyOrder = await BuyOrder.find();

      res.status(200).json({
        status:200,
        message:buyOrder
      })

  }catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

app.get('/buyOrdersingle', async(req, res)=>{
  try{
      let buyOrder = await BuyOrder.findOne({MbeId:req.query.MbeId});

      await buyOrder.save();

      res.status(200).json({
        status:200,
        message:buyOrder
      })

  }catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

app.get('/sellOrder', async(req, res)=>{
  try{
      let sellOrder = await SellOrder.find({});
      
      res.status(200).json({
        status:200,
        message:sellOrder
      })

  }catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

app.get('/sellOrderSingle', async(req, res)=>{
  try{
      let sellOrder = await SellOrder.findOne({MbeId:req.query.MbeId});

      res.status(200).json({
        status:200,
        message:sellOrder
      })

  }catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

app.post('/walletbalanceAddition',  passport.authenticate("jwt", { session: false }),async(req,res)=>{
  try{
      let {
        email
      }= req.user;

      const walletData = await Wallet.findOne({MbeId:email});

      console.log(walletData);
      let balance = parseFloat( walletData.CBDCbalance);
      let amount = parseFloat(req.body.amount);
      const wallet = await Wallet.findOneAndUpdate({MbeId:email}, {$set:{CBDCbalance:(balance+amount)}})

      const updatedwallet = await Wallet.findOne({MbeId:email});
      res.status(200).json({
        status:200,
        message:updatedwallet
      })

  }catch (e) {
     res.json({
      status:404,
      message:"Not found"
    }); 
  }
});

module.exports = app;


app.get('/listInvestors', async (req, res) => {
  try {
   
    // console.log("hihihihi")
    let investorList = await Bonds.find({}, {MbeId:1, TotalTokenQty:1, Isin:1})
    console.log(investorList);
    res.status(200).json({
      status: 200,
      message: investorList,
    });
  } catch (err) {
    res.send(err);
  }
});