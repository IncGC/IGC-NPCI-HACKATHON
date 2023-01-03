const TransactionsModel = require("../models/transactions");


exports.transaction= async(req,res)=>{
    try {
        let {
            Date ,
    OrderId,
    MbeId: String,
    Isin,
    IssuerName,
    CouponRate,
    MaturityDate,
    Ltp,
    FaceValue,
    CreditRating,
    NumOfToken,
    NumOfLots,
    TransactionsType,
    DetokenizedToken,
    AskedPrice,
    BidPrice,
    PurhcasePrice,
    CurrentPrice,
    Amount,
    Authorization,
    Status
        } = req.body;

        const transactionData={
            Date ,
            OrderId,
            MbeId: String,
            Isin,
            IssuerName,
            CouponRate,
            MaturityDate,
            Ltp,
            FaceValue,
            CreditRating,
            NumOfToken,
            NumOfLots,
            TransactionsType,
            DetokenizedToken,
            AskedPrice,
            BidPrice,
            PurhcasePrice,
            CurrentPrice,
            Amount,
            Authorization,
            Status
        }

        const transactionResult = new TransactionsModel(transactionData);

        res.status(200).json({
            status:200,
            message:transactionResult
        })
    }catch(err){
        res.send(err)
    }
}

exports.getTrasactions= async(req,res)=>{
    try{
        let {
            Isin
        }= req.query;

        const transactionResult = await TransactionsModel.findOne({Isin});

        res.status(200).json({
            status:200,
            message:transactionResult
        })
    }catch (err){
        res.send(err)
    }
}