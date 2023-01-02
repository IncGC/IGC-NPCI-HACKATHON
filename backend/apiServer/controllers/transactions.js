const TransactionsModel = require("../models/transactions");


exports.transaction= async(req,res)=>{
    try {
        let {
            trnxID,
            Isin,
            userID,
            NumOfToken,
            date,
            type,
            status,
            authorization,
            amount,
            certificate
        } = req.body;

        const transactionData={
            trnxID,
            Isin,
            userID,
            NumOfToken,
            date,
            type,
            status,
            authorization,
            amount,
            certificate
        }

        const transactionResult = await TransactionsModel.create({transactionData});

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
            trnxID
        }= req.body;

        const transactionResult = await TransactionsModel.findOne({trnxID});

        res.status(200).json({
            status:200,
            message:transactionResult
        })
    }catch (err){
        res.send(err)
    }
}