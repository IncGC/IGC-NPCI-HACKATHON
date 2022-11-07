const express = require("express");
var router = express.Router();
const bodyparser = require("body-parser");
const { registerUser } = require("../app/registerUser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const helper = require('../utils/helper');

const passport = require('passport');
var moment = require('moment');

var logger = helper.getLogger("Routes");

router.post("/SignUp", async function (req, res) {
try{

  const {firstName, lastName, email,phoneNumber, panCard, password}= req.body;

  var created_on = moment(new Date()).format();
  var modifed_on = moment(new Date()).format();
  var modifed_by = "Admin";

  var mongodb = global.db;
  logger.debug("User name : " + email);
  if (!email) {
    res.json(getErrorMessage("'email'"));
    return;
  }

  mongodb.collection("users").find({ email: req.body.email }).toArray(async function (err, exiRes) {
    console.log("exiRes", exiRes)
    if (exiRes.length > 0) {

      return res.status(200).json({ success: false, message: 'User Already Exists' });
    } else {

      let response = await registerUser({ OrgMSP: "org1MSP", userId: email });

      logger.debug("response is  : " + response);

      logger.debug(
        "-- returned from registering the email %s for organization %s",
        email,
      );
      if (response && typeof response !== "string") {
        logger.debug(
          "Successfully registered the email %s for organization %s",
          email,
        );

        const salt = await bcrypt.genSalt(10);
        var hashedpassword = await bcrypt.hash(req.body.password, salt);

        var newusers = {
          email: req.body.email,
          status: 'Active',
          firstName,
          lastName,
          phoneNumber,
          panCard,
          password: hashedpassword,
          created_on: created_on,
          modified_on: modifed_on,
          modified_by: modifed_by,
        };

        var userlogs = {
          email: req.body.email,
          status: "Active",
          userdesc: req.body.userdesc,
          usermail: req.body.usermail,
          modified_on: modifed_on,
          modified_by: modifed_by
        };

        mongodb.collection("users").insertOne(newusers).then(result => {
          console.log("result is", result, result["ops"][0]["_id"])
          if (result) {
            mongodb.collection("userlogs").insertOne(userlogs).then(result1 => {
              return res.status(200).json({ success: true, message: 'User Registered Successfully' });
            });
          }
        });

      } else {
        logger.debug(
          "Failed to register the email %s for organization %s with::%s",
          email,
          response
        );
        res.json({
          success: false,
          message: response
        });
      }
    }
  });

}catch(err){
  res.send(err);
}
});


router.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  var mongodb = global.db;
  var query = { $and: [{ email: req.body.email }, { status: "Active" }] };
  //Find the user by email
  mongodb.collection("users").findOne(query).then(exiRes => {
    //Check for user
    if (exiRes) {
      //Check password
      bcrypt.compare(password, exiRes.password)
        .then(isMatch => {
          if (isMatch) {
            //User matched
            const payload = { id: exiRes._id, email: exiRes.email, msp: exiRes.org };//Create JWT Payload
            console.log("payLoad", payload)
            //Sign Token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600000 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              })
            });
          } else {
            return res.status(200).json({ success: false, message: "Password Incorrect" });
          }
        });
    } else {
      return res.status(200).json({ success: false, message: "User not found" });
    }
  });
});

router.post('/forgot', async(req, res)=>{
  const {email }= req.body;

  var mongodb = global.db;
  var query = { $and: [{ email: req.body.email }, { status: "Active" }] };
  mongodb
  .collection("users")
  .findOne(query)
  .then((exiRes) => {
    console.log(exiRes);
    if(exiRes){
      const payload={
        userId:exiRes._id,
        email:exiRes.email,
        password:exiRes.password
      };
      res.send("Your password has been successfully sent to your registered mail ID");
      let text=JSON.stringify(payload);
      // let userInfo=`Hi ${email},  your password is ${payload}. thank you `
      // mailer.main(email, "password", userInfo);
    console.log(payload);
    }
 else{
    res.send("User not found! ")
  }
});
});

// const router = require('express').Router();

const{HandleError}= require('../utils/HandleResponseError');
const {CHAINCODE_ACTIONS, CHAIN_CHANNEL, CHAINCODE_NAMES, getNow, CHAINCODE_CHANNEL}=require('../utils/helper');
const {MOCK_LIVE_MARKET_DATA}=require('../utils/mockData');
const {invokeTransaction}= require('../app/invoke');

router.post('/liveMarket', async (req, res)=>{
    try{
        let{ securityCode, issuerName, couponRate, maturity, volume, price, yield, currency, noOfTokens}=req.body;
           
        console.log(req.body);
        const tokenValue= parseInt(volume)/parseInt(noOfTokens);

        console.log("your token value is here :"+tokenValue);
        let data = {
            securityCode, 
            issuerName, 
            couponRate,
            maturity,
            volume,
            price,
            yield,
            currency,
            tokenValue,
            CreatedOn: getNow(),
            // CreatedBy:req.user.id,
            isDelete: false
        }
        let jsonobj= JSON.stringify(data)
        console.log("your data is here: "+jsonobj);
        let message = await invokeTransaction({
            // metaInfo:{userName:req.user.email, org:"org1MSP"},
            metaInfo:{userName:"pintookumar@inclusivegrowthchain.com", org:"org1MSP"},
            // metaInfo:defaultValue,
            chainCodeAction:"create",
            channelName:"common",
            data:data,
            chainCodeFunctionName:'create',
            chainCodeName:"token"
        })
        console.log("hi")
        console.log(message);
        res.status(201).json(data);
    }catch(err){
        // HandleError(err,res);
      res.send("err");
      console.log("you got the error here! ")
      }
})





module.exports = router;
