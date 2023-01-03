const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const TransactionsModel = new schema(
  {
    Date: String,
    OrderId: String,
    MbeId: String,
    Isin: String,
    IssuerName: String,
    CouponRate: String,
    MaturityDate: String,
    Ltp: String,
    FaceValue: String,
    CreditRating: String,
    NumOfToken: String,
    NumOfLots: String,
    TransactionsType: String,
    DetokenizedToken: String,
    AskedPrice: String,
    BidPrice: String,
    PurhcasePrice: String,
    CurrentPrice: String,
    Amount: String,
    Authorization: String,
    Status: String,
    Remark: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionsModel", TransactionsModel);
