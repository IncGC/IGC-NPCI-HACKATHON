const mailer = require("../utils/Mailer");
require("dotenv").config();
const UserModel = require("../models/User");
const PanCardModel = require("../models/PanCard");
const { PHONE_ALREADY_EXISTS_ERR } = require("../utils/HandleResponseError");
const otpGenerator = require("otp-generator");
const fast2sms = require("fast-two-sms");
const OrderBookModel = require("../models/orderBook");

exports.phone_email_otp = async (req, res) => {
  try {
    let { email, phoneNumber, panCard, aadharCard } = req.body;

    // let otp = otpGenerator.generate(4, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    //   lowerCaseAlphabets:false,
    // });

    // var otp = "1234"
    // let investor = email.split("@")[0];
    var generateOtp = function () {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    };
    var otp = generateOtp();
    console.log(otp);


    // console.log("HIIII");
    if (panCard) {
      const panCarddata = await PanCardModel.findOne({ panCard });
      console.log(panCarddata);

      // let query = {
      //   MbeId: "4231",
      // };
      // const orderresult = await OrderBookModel.findOne({ query });

      // console.log(orderresult);

      if (!panCarddata) {
        res.status(200).json({
          status: 400,
          message: "No data found",
        });
        return;
      }

      let investor = panCarddata.firstName;

      console.log(investor + "hihihi");

      let userInfo = `Hi ,
         your login credantials have been created.
         your username is :  
                and
         your password is: ${otp}. 
         Thank you `;

      await mailer.main(
        panCarddata.email,
        "One Time Password for MicroBond Exchange",
        userInfo
      );

      let smsOtp = `Hi ,
        This is your OTP ${otp}`;

      let usermodel = await UserModel.updateOne(
        { phoneNumber: panCarddata.phoneNumber },
        { $set: { phoneOtp: otp } }
      );

      // await usermodel.save();

      var SendingSMS = {
        authorization: process.env.API_KEY,
        message: smsOtp,
        numbers: [panCarddata.phoneNumber],
      };
      let sms = await fast2sms.sendMessage(SendingSMS);
      console.log(sms);
    }

    if (aadharCard) {
      const panCarddata = await PanCardModel.findOne({ aadharCard });

      if (!panCarddata) {
        res.status(200).json({
          status: 400,
          message: "No data found",
        });
        return;
      }

      let investor = panCarddata.firstName;

      console.log(investor);

      let userInfo = `Hi ,
         your login credantials have been created.
         your username is :  
                and
         your password is: ${otp}. 
         Thank you `;

      await mailer.main(
        panCarddata.email,
        "One Time Password for MicroBond Exchange",
        userInfo
      );

      let usermodel = await UserModel.updateOne(
        { phoneNumber: panCarddata.phoneNumber },
        { $set: { phoneOtp: otp } }
      );

      // await usermodel.save();
      let smsOtp = `Hi ,
        This is your OTP ${otp}`;

      var SendingSMS = {
        authorization: process.env.API_KEY,
        message: smsOtp,
        numbers: [panCarddata.phoneNumber],
      };
      let sms = await fast2sms.sendMessage(SendingSMS);
      console.log(sms);
    }

    if (phoneNumber) {
      const phoneExist = await UserModel.findOne({ phoneNumber });

      if (phoneExist) {
        let usermodel = await UserModel.updateOne(
          { phoneNumber },
          { $set: { phoneOtp: otp } }
        );
        // let SendingSMS = {
        //   authorization: process.env.API_KEY,
        //   message: smsOtp,
        //   numbers: [phoneNumber],
        // };
        // // await usermodel.save();
        // let sms = await fast2sms.sendMessage(SendingSMS);
        // console.log(sms);

        res.status(200).json({
          status: 200,
          message: "Phone Number already Exist !",
        });
        return;
      } else {
        let smsOtp = `Hi,
      This is your OTP ${otp}`;

        let SendingSMS = {
          authorization: process.env.API_KEY,
          message: smsOtp,
          numbers: [phoneNumber],
        };
        let sms = await fast2sms.sendMessage(SendingSMS);
        console.log(sms);
      }
    }

    if (email) {
      let investor = email.split("@")[0];

      let userInfo = `Hi ,
        your login credantials have been created.
        your username is : ${email} 
               and
        your password is: ${otp}. 
        Thank you `;

      await mailer.main(
        email,
        "One Time Password for MicroBond Exchange",
        userInfo
      );

      const userData = {
        email,
        phoneNumber,
        phoneOtp: otp,
      };
      let userExis = await UserModel.findOne({ email });
      if (userExis) {
        await userExis.updateOne({ email }, { $set: { phoneOtp: otp } });
        await userExis.save();
        res.status(200).json({
          status: 200,
          message: "User Exist ! Updated OTP sent Successfully !!",
        });
        return;
      } else {
        let userResult = await UserModel.create(userData);
        await userResult.save();
      }
    }

    const { wallet } = await fast2sms.getWalletBalance(process.env.API_KEY);
    console.log(wallet);
    res.status(200).json({
      status_code: 200,
      message: " OTP sent Successfully",
    });
  } catch (err) {
    res.send("err");
  }
};

exports.phone_email_verification = async (req, res, next) => {
  try {
    const { phoneNumber, email, enterOtp, aadharCard, panCard } = req.body;
    const userResult = await UserModel.findOne({ phoneNumber });
    const userResultemail = await UserModel.findOne({email});
    console.log(userResult);
    if (!userResult || !userResultemail) {
      res.send({
        status: 400,
        message: "User not found",
      });
      return;
    }
    if (userResult.phoneOtp !== enterOtp)  {
      res.send({
        status: 400,
        message: "Wrong OTP entered",
      });
      return;
    }
    if ( userResultemail.phoneOtp !== enterOtp){
      res.send({
        status: 400,
        message: "Wrong OTP entered",
      });
      return;
    }
    // userResult.phoneOtp = "";

    // await userResult.save();

    res.status(201).json({
      // type:"Success",
      status_code: 200,
      message: "OTP successfully verified",
    });
  } catch (err) {
    res.send(err);
  }
};

exports.panOtp = async (req, res) => {
  try {
    const { panCard } = req.body;
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const panCarddata = await PanCardModel.findOne({ panCard });

    if (!panCarddata) {
      res.status(200).json({
        status: 400,
        message: "No data found",
      });
      return;
    }

    let investor = panCarddata.firstName;

    console.log(investor);

    let userInfo = `Hi ,
       your login credantials have been created.
       your username is :  
              and
       your password is: ${otp}. 
       Thank you `;

    await mailer.main(
      Nsedata.email,
      "One Time Password for MicroBond Exchange",
      userInfo
    );

    let smsOtp = `Hi ,
      This is your OTP ${otp}`;

    var SendingSMS = {
      authorization: process.env.API_KEY,
      message: smsOtp,
      numbers: [panCarddata.phoneNumber],
    };
    let sms = await fast2sms.sendMessage(SendingSMS);
    console.log(sms);

    const phoneExist = await UserModel.findOne({
      phoneNumber: panCarddata.phoneNumber,
    });

    console.log(phoneExist);

    if (phoneExist) {
      res.status(200).json({
        status: 200,
        message: PHONE_ALREADY_EXISTS_ERR,
      });
      return;
    }

    const userData = {
      firstName: panCarddata.firstName,
      lastName: panCarddata.lastName,
      panCard: panCarddata.panCard,
      phoneNumber: panCarddata.phoneNumber,
      fatherName: panCarddata.fatherName,
      gender: panCarddata.gender,
      DOB: panCarddata.DOB,
      Nationality: panCarddata.Nationality,
      phoneOtp: otp,
    };

    console.log(userData);

    let userResult = await UserModel.create(userData);
    // //   // await UserModel.save();
    console.log(userResult);
    const { wallet } = await fast2sms.getWalletBalance(process.env.API_KEY);
    res.status(200).json({
      type: "success",
      message: "Account created OTP sent to Mobile Number",
      data: {
        // userId:user._id,
        sms,
        wallet,
        userResult,
      },
    });
  } catch (err) {
    res.send("err");
  }
};

exports.panOtpVerification = async (req, res, next) => {
  try {
    const { panCard, enterOtp } = req.body;
    const userResult = await UserModel.findOne({ panCard });
    console.log(userResult);
    if (!userResult) {
      res.send({
        status: 400,
        message: "User not found",
      });
      return;
    }
    if (userResult.phoneOtp !== enterOtp) {
      res.send({
        status: 400,
        message: "Wrong OTP entered",
      });
      return;
    }
    userResult.phoneOtp = "";

    await userResult.save();

    res.status(201).json({
      type: "Success",
      message: "OTP successfully verified",
    });
  } catch (err) {
    res.send(err);
  }
};
exports.aadharotp = async (req, res) => {
  try {
    const { aadharCard } = req.body;
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const panCarddata = await PanCardModel.findOne({ aadharCard });

    if (!panCarddata) {
      res.status(200).json({
        status: 400,
        message: "No data found",
      });
      return;
    }

    let investor = panCarddata.firstName;

    console.log(investor);
    // res.send(panCarddata);

    // let userInfo = `Hi ,
    //  your login credantials have been created.
    //  your username is :
    //         and
    //  your password is: ${otp}.
    //  Thank you `;

    // await mailer.main(Nsedata.email, "One Time Password for MicroBond Exchange", userInfo);

    let smsOtp = `Hi ,
      This is your OTP ${otp}`;

    var SendingSMS = {
      authorization: process.env.API_KEY,
      message: smsOtp,
      numbers: [panCarddata.phoneNumber],
    };
    let sms = await fast2sms.sendMessage(SendingSMS);
    console.log(sms);

    const phoneExist = await UserModel.findOne({
      phoneNumber: panCarddata.phoneNumber,
    });

    console.log(phoneExist);

    if (phoneExist) {
      res.status(200).json({
        status: 200,
        message: PHONE_ALREADY_EXISTS_ERR,
      });
      return;
    }

    const userData = {
      firstName: panCarddata.firstName,
      lastName: panCarddata.lastName,
      panCard: panCarddata.panCard,
      phoneNumber: panCarddata.phoneNumber,
      fatherName: panCarddata.fatherName,
      gender: panCarddata.gender,
      DOB: panCarddata.DOB,
      Nationality: panCarddata.Nationality,
      phoneOtp: otp,
    };

    console.log(userData);

    let userResult = await UserModel.create(userData);
    await userResult.save();
    console.log(userResult);
    const { wallet } = await fast2sms.getWalletBalance(process.env.API_KEY);
    res.status(200).json({
      type: "success",
      message: "Account created OTP sent to Mobile Number",
      data: {
        sms,
        wallet,
        userResult,
      },
    });
  } catch (err) {
    res.send("err");
  }
};

exports.aadharOtpVerification = async (req, res, next) => {
  try {
    const { aadharCard, enterOtp } = req.body;
    const userResult = await UserModel.findOne({ aadharCard });
    console.log(userResult);
    if (!userResult) {
      res.send({
        status: 400,
        message: "User not found",
      });
      return;
    }
    if (userResult.phoneOtp !== enterOtp) {
      res.send({
        status: 400,
        message: "Wrong OTP entered",
      });
      return;
    }
    userResult.phoneOtp = "";

    await userResult.save();

    res.status(201).json({
      type: "Success",
      message: "OTP successfully verified",
    });
  } catch (err) {
    res.send(err);
  }
};
