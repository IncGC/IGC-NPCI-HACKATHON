
const NseModel = require("../models/NseData");
const PanCardModel = require("../models/PanCard");
const orgModel = require("../models/org");
const {
    ObjectExistsError
} = require("../utils/HandleResponseError")


exports.orgPost = async(req,res)=>{
  try{
    let {
      orgID,
      marketOpen
    }=req.body;

    const orgData= {
      orgID,
      marketOpen
    }

    const orgResult= await orgModel.create({orgData});

    res.status(200).json({
      status:200,
      message:orgResult
    })
  }catch(err){
    res.send(err)
  }
}

exports.orgGet = async(req,res)=>{
  try{
    let {
      orgID
    }=req.params;

  

    const orgResult= await orgModel.findOne({orgID});

    res.status(200).json({
      status:200,
      message:orgResult
    })
  }catch(err){
    res.send(err)
  }
}

exports.NseMockData =  async(req, res)=>{
  try{
    const {firstName,lastName,fatherName,Nationality,email,phoneNumber,panCard,aadharCard,gender,address,DOB}= req.body;
    console.log("sadfghjhgfds")
   
    let exists = await NseModel.findOne({ email: email });
    console.log("sadfghjhgfds")

    if (exists) {
      res.send({
        message: "User with this email already exists",
      });
      return
    }

    console.log("qwertyuioiuytr")
    const userData = {firstName,lastName,fatherName, Nationality,email,phoneNumber,panCard,aadharCard,gender,address,DOB};

    let NseUserDataResult = await NseModel.create(userData);
    NseUserDataResult = { ...NseUserDataResult._doc };


    res.status(200).json({
        status_code: 200,
        message:"Successfully posted data",
        data:NseUserDataResult
    });


  }catch(err){
    res.send("err")
  }
}

exports.getNseData = async (req, res)=>{
  try{
    const {panCard, aadharCard} = req.query;
    const Nsedata= await NseModel.findOne({panCard,aadharCard})
    
    console.log(panCard);
    if (!Nsedata){
      res.status(200).json({
        status:400,
        message:"No data found"
      })
      return
    }
    res.status(200).json({
        status_code: 200,
        message:"Fetched Data Successfully ",
        data:Nsedata
    });

  }catch(err){
    res.send(err, res);
  }
}

exports.PanCardMockData= async(req, res)=>{
  try{
    const {firstName,lastName,fatherName,Nationality,phoneNumber,email,panCard,aadharCard,gender,address,DOB}= req.body;
    
    console.log(req.body);
    let exists = await PanCardModel.findOne({ panCard: panCard });
    console.log("hihihihihih")
    if (exists) {
      res.json({
        status:403,
        message:"Data already exist"
      })
      return
    }
console.log("exists");
    const userData = {firstName,lastName,fatherName, Nationality,phoneNumber,email,panCard,aadharCard,gender,address,DOB};

    let panCardDataResult = await PanCardModel.create(userData);
    panCardDataResult = { ...panCardDataResult._doc };


    res.status(200).json({
        status_code: 200,
        message:"Successfully posted data",
        data:panCardDataResult
    });

  }catch(err){
    res.send("Unexpected error")
  }
}

exports.getPancarddata = async (req, res)=>{
  try{
    const {panCard} = req.query;
    const panCarddata= await PanCardModel.findOne({panCard})
    
    if (!panCarddata){
      res.status(200).json({
        status:400,
        message:"No data found"
      })
      return
    }
    res.status(200).json({
        status_code: 200,
        message:"Fetched Data Successfully ",
        data:panCarddata
    });

  }catch(err){
    res.send("Unexpected Error");
  }
}