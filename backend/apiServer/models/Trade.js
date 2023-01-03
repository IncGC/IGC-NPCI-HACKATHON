const mongoose = require("mongoose");

var BondSchema = new mongoose.Schema(
  {
    Isin: String,
    MbeId: String,
    IssuerName: String,
    CouponRate: String,
    FaceValue:String,
    Ltp: String,
    CreditRating:String,
    MaturityDate:String,
    SecurityDescription:String,
    Currency:String,
    LotQty:String,
    IsTokenized: {
      type: Boolean,
      default: false
    },
    TokenizedLot: String,
    TotalTokenQty: String,
    TokenQtyRemaining: String,
    IsProcessed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var SellOrderSchema = new mongoose.Schema(
  {
    OrderId: String,
    MbeId: String,
    Isin: String,
    IssuerName:String,
    TransactionsType:{
      type:String,
      default:"Sell Order"
    },
    NumOfToken: String,
    Price: String,
    IsProcessed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var BuyOrderSchema = new mongoose.Schema(
  {
    OrderId: String,
    MbeId: String,
    Isin: String,
    IssuerName:String,
    TransactionsType:{
      type:String,
      default:"Buy Order"},
    NumOfToken: String,
    Price: String,
    IsProcessed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var PurchaseLogSchema = new mongoose.Schema(
  {
    BuyOrderId: String,
    SellOrderId: String,
    MbeId: String,
    SellerMbeId: String,
    Isin: String,
    IssuerName:String,
    CouponRate: String,
    MaturityDate:String,
    NumOfToken: String,
    Price: String,
    TradeValue: String,
    Purchased: {
      type: Boolean,
      default: false
    },
    IsProcessed: {
      type: Boolean,
      default: false
    },
    IsAuthorized: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var WalletSchema = new mongoose.Schema(
  {
    MbeId: String,
    CBDCbalance: String, //Seller or Buyer
    IsUpdated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var Bonds = mongoose.model("Bonds", BondSchema);
var SellOrder = mongoose.model("SellOrder", SellOrderSchema);
var BuyOrder = mongoose.model("BuyOrder", BuyOrderSchema);
var Wallet = mongoose.model("Wallet", WalletSchema);
var PurchaseLog = mongoose.model("PurchaseLog", PurchaseLogSchema);

module.exports = { Bonds, SellOrder, BuyOrder, Wallet, PurchaseLog };
