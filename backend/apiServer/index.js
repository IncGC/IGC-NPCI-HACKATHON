const fs = require("fs");
const { parse } = require("csv-parse");
const express = require('express');
const bodyParser = require('body-parser');

//READ Trade Schema
const { Bonds, SellOrder, BuyOrder, Wallet, PurchaseLog } = require('./models/Trade');

//MatchOrder function
const { CompareLimitOrder, VerifyBuyOrderList, VerifySellOrderList, storeRecord } = require('./config/helper');

//Read ConnectDB function
// const { connectDb } = require('./config/db');

require('dotenv').config();
// connectDb();

const app = express();
app.use(bodyParser.json())
// let port = process.env.PORT;

//API Endpoint to read file and push data
app.post('/pushBondDetails', async (req, res) => {
    try {
        async function readFile() {
            fs.createReadStream("./data/bond.csv")
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", async function (row) {
                    let obj = { "BondId": row[0], "UserId": row[1], "Name": row[2], "LotQty": row[3], "TokenizedLot": row[4], "TotalTokenQty": row[5], "TokenQtyRemaining": row[6] }
                    var record = new Bonds(obj);
                    record.save()
                }).on("end", function () {
                    console.log("end");
                })
        }
        readFile();
        // res.send("Succesfully Pushed");
        var recordData= await Bonds.find();
        res.status(201).json({
            status:201,
            message:recordData
        });
    } catch (e) {
        res.send(e);
    }
})


app.post('/pushSellorders', async (req, res) => {
    try {
        async function readFile() {
            fs.createReadStream("./data/sellOrder.csv")
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", async function (row) {
                    let obj = { "OrderId": row[0], "UserId": row[1], "BondId": row[2], "Quantity": row[3], "Price": row[4] }
                    var record = new SellOrder(obj);
                    record.save()
                }).on("end", function () {
                    console.log("end");
                })
        }
        readFile();
        res.send("Succesfully Pushed");
    } catch (e) {
        res.send(e);
    }
})

app.post('/pushBuyorders', async (req, res) => {
    try {
        async function readFile() {
            fs.createReadStream("./data/buyOrder.csv")
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", async function (row) {
                    let obj = { "OrderId": row[0], "UserId": row[1], "BondId": row[2], "Quantity": row[3], "Price": row[4] }
                    var record = new BuyOrder(obj);
                    record.save()
                }).on("end", function () {
                    console.log("end");
                })
        }
        readFile();
        res.send("Succesfully Pushed");
    } catch (e) {
        res.send(e);
    }
})

app.post('/pushWallets', async (req, res) => {
    try {
        async function readFile() {
            fs.createReadStream("./data/wallet.csv")
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", async function (row) {
                    let obj = { "UserId": row[0], "UserType": row[1], "TotalFunds": row[2], "Spent": row[3], "Earnings": row[4] }
                    var record = new Wallet(obj);
                    record.save()
                }).on("end", function () {
                    console.log("end");
                })
        }
        readFile();
        res.send("Succesfully Pushed");
    } catch (e) {
        res.send(e);
    }
})

app.post('/tokenize', async (req, res) => {
    try {
        var bondDetails = await Bonds.find({ "BondId": req.body.BondId, "UserId": req.body.UserId });
        console.log("bondDetails", bondDetails)
        if ((parseFloat(bondDetails[0].LotQty) > 0 && parseFloat(bondDetails[0].LotQty) >= parseFloat(req.body.LotNumber))) {
            let _tokenizedLot = parseFloat(bondDetails[0].TokenizedLot) + parseFloat(req.body.LotNumber);
            let _newLotQty = parseFloat(bondDetails[0].LotQty) - parseFloat(req.body.LotNumber);
            let _totalTokenQty = parseFloat(bondDetails[0].TotalTokenQty) + parseFloat(req.body.TotalTokenQty);
            let _TokenQtyRemaining = parseFloat(bondDetails[0].TokenQtyRemaining) + parseFloat(req.body.TotalTokenQty);
            let obj = await Bonds.findOneAndUpdate({ UserId: req.body.UserId, BondId: req.body.BondId }, { $set: { TokenizedLot: _tokenizedLot, LotQty: _newLotQty, isTokenized: true, TotalTokenQty: _totalTokenQty,TokenQtyRemaining:_TokenQtyRemaining } }, { upsert: true });
            // console.log("Iam here");
            if (obj) {
                res.json("Successfully Tokenized");
            }
        } else {
            res.json("No Sufficient Lot to Tokenized");
        }
    } catch (e) {
        res.send(e);
    }
})

app.post('/deTokenize', async (req, res) => {
    try {
        var bondDetails = await Bonds.find({ "BondId": req.body.BondId, "UserId": req.body.UserId });
        console.log("bondDetails", bondDetails)
        if ((parseFloat(bondDetails[0].TotalTokenQty) >= 200000) && (parseFloat(req.body.tokenQty) >= 200000)) {
            let _lotQty = parseFloat(req.body.tokenQty) / 200000;
            // //--- update by MPK ----
            // if(_lotQty > parseFloat(bondDetails[0].TokenizedLot)){
            //     res.status(400).send("new lots grater than tokenized lots");
            //     return;
            // }
            // //--- updated by MPK ----
            let _newLotQty = parseFloat(bondDetails[0].LotQty) + _lotQty;
            let _newTokenizedLot = parseFloat(bondDetails[0].TokenizedLot) - _lotQty;
            let _newTotalTokenQty = parseFloat(bondDetails[0].TotalTokenQty) - parseFloat(req.body.tokenQty);
            console.log("_lotQty", _lotQty, _newLotQty, _newTokenizedLot, _newTotalTokenQty)
            let obj = await Bonds.findOneAndUpdate({ UserId: req.body.UserId, BondId: req.body.BondId }, { $set: { TokenizedLot: _newTokenizedLot, LotQty: _newLotQty, TotalTokenQty: _newTotalTokenQty } }, { upsert: true });
            if (obj) {
                res.json("Successfully DeTokenized");
            }
        } else {
            res.json("No Sufficient Token to DeTokenized");
        }
    } catch (e) {
        res.send(e);
    }
})


//IN PROGRESS
app.post('/convertToBond', async (req, res) => {
    try {

    } catch (e) {
        res.send(e);
    }
})


app.post('/placeSellOrder', async (req, res) => {
    try {
        var bondDetails = await Bonds.find({ "BondId": req.body.BondId, "UserId": req.body.UserId });
        console.log("bondDetails",bondDetails)
        if (parseFloat(bondDetails[0].TokenQtyRemaining) >= parseFloat(req.body.Quantity)) {
            let sellorder = [{ "OrderId": req.body.OrderId, "UserId": req.body.UserId, "BondId": req.body.BondId, "Quantity": req.body.Quantity, "Price": req.body.Price }];
            let bArray =[];
            let buyOrderBook = await BuyOrder.findOne({ "BondId": req.body.BondId, "Quantity": req.body.Quantity, "Price": req.body.Price, "isProcessed": false });
            bArray.push(buyOrderBook);
            console.log("sellorder",sellorder,buyOrderBook);
          
            if((Object.keys(buyOrderBook || {}).length > 0)){
                await VerifyBuyOrderList(sellorder, bArray);
                res.json("Successfully Placed Sell Order. Match found and processed your order");
            }else{
                let obj = { "OrderId": req.body.OrderId, "UserId": req.body.UserId, "BondId": req.body.BondId, "Quantity": req.body.Quantity, "Price": req.body.Price };
                await storeRecord("Sell", obj);
                // res.json("Successfully Placed Sell Order");

                const SellOrderData= await SellOrder.find();

                res.status(200).json({
                    status:200,
                    message:SellOrderData
                })
            }
        } else {
            res.json("No Sufficient Token to place sell order");
        }
    } catch (e) {
        res.send(e);
    }
})


app.post('/placeBuyOrder', async (req, res) => {
    try {
        let walletBalance = await Wallet.find({ "UserId": req.body.UserId });
        console.log(walletBalance)
        // Updated by MPK
        // if (parseFloat(walletBalance[0].TotalFunds) >= parseFloat(req.body.Price)) {
        if (parseFloat(walletBalance[0].TotalFunds) >= parseFloat(req.body.Price) *  parseFloat(req.body.Quantity)) {
            let buyorder = [{ "OrderId": req.body.OrderId, "UserId": req.body.UserId, "BondId": req.body.BondId, "Quantity": req.body.Quantity, "Price": req.body.Price }]
            console.log("buyorder",buyorder)

            let sArray =[];
            let sellorderBook = await SellOrder.findOne({ "BondId": req.body.BondId, "Quantity": req.body.Quantity, "Price": req.body.Price, "isProcessed": false });
            console.log(sellorderBook)
            sArray.push(sellorderBook);
            console.log("buyorder", buyorder, sellorderBook,sArray);

            if((Object.keys(sellorderBook || {}).length > 0)){
               await VerifySellOrderList(buyorder, sArray);
                res.json("Successfully Placed Buy Order. Match found and processed your order");
            }else{
                let obj = { "OrderId": req.body.OrderId, "UserId": req.body.UserId, "BondId": req.body.BondId, "Quantity": req.body.Quantity, "Price": req.body.Price };
                await storeRecord("Buy", obj);
                res.json("Successfully Placed Buy Order");
            }
        } else {
            res.json("No Sufficient Balance");
        }
    } catch (e) {
        console.log("e",e)
        res.send(e);
    }
})

app.get('/compareOrderBook', async (req, res) => {
    try {
        let buyorderBook = await BuyOrder.find({ "isProcessed": false });
        let sellOrderBook = await SellOrder.find({ "isProcessed": false });
        await CompareLimitOrder(sellOrderBook, buyorderBook, false);
    } catch (e) {
        res.send(e);
    }
})

// app.listen(port, () => console.log(`Listening on port ${port}!`))

module.exports= app;

