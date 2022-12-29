const {Bonds} = require("../models/Trade");

exports.bonddetails= async(req,res)=>{
    try{
        const bonddetailsDAta = await Bonds.find({isTokenized:true});

        console.log(bonddetailsDAta);

        res.status(200).json({
            status:200,
            message:bonddetailsDAta
        })

    }catch(err){
        res.send(err)
    }
}