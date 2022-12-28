const mongoose = require("mongoose");

var BondSchema = new mongoose.Schema(
  {
    BondId: String,
    UserId: String,
    Name: String,
    LotQty: String,
    isTokenized: {
      type: Boolean,
      default: false
    },
    TokenizedLot: String,
    TotalTokenQty: String,
    TokenQtyRemaining: String,
    isProcessed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var SellOrderSchema = new mongoose.Schema(
  {
    OrderId: String,
    UserId: String,
    BondId: String,
    Quantity: String,
    Price: String,
    isProcessed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var BuyOrderSchema = new mongoose.Schema(
  {
    OrderId: String,
    UserId: String,
    BondId: String,
    Quantity: String,
    Price: String,
    isProcessed: {
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
    UserId: String,
    SellerUserId: String,
    BondId: String,
    Quantity: String,
    Price: String,
    TradeValue: String,
    Purchased: {
      type: Boolean,
      default: false
    },
    isProcessed: {
      type: Boolean,
      default: false
    },
    isAuthorized: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var WalletSchema = new mongoose.Schema(
  {
    UserId: String,
    UserType: String, //Seller or Buyer
    TotalFunds: String,
    isUpdated: {
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
