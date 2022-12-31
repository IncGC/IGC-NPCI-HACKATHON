const { registerUser } = require("../app/registerUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const {
  generateId
} = require("../utils/helper");
var moment = require("moment");
const mailer = require("../utils/Mailer");
require("dotenv").config();
const UserModel = require("../models/User");
const PanCardModel = require("../models/PanCard");
const NseModel = require("../models/NseData");

const {
  HandleResponseError,
  ObjectExistsError,
} = require("../utils/HandleResponseError");

//  registerUser({ OrgMSP: "org1MSP", userId: "pintu" });

exports.createInvestor = async (req, res) => {
  try {
    const {
      panCard,
      phoneNumber,
      aadharCard,
    } = req.body;

    const panCarddata = await PanCardModel.findOne({ panCard });
    const nseData = await NseModel.findOne({ panCard });
    // console.log(panCarddata);
    const salt = await bcrypt.genSalt(10);
    let generatedPassword = "pwd_" + panCarddata.panCard;
    let hashedpassword = await bcrypt.hash(generatedPassword, salt);
    // console.log(userResult);
    if (panCarddata) {
      var userResult = await UserModel.updateOne(
        { phoneNumber },
        {
          $set: {
            firstName: panCarddata.firstName,
            lastName: panCarddata.lastName,
            fatherName: panCarddata.fatherName,
            Nationality: panCarddata.Nationality,
            panCard: panCarddata.panCard,
            aadharCard: panCarddata.aadharCard,
            gender: panCarddata.gender,
            address: panCarddata.address,
            DOB: panCarddata.DOB,
            password: hashedpassword,
            role: "investor",
            mbe_id: panCarddata.email,
            nse_registered: false,
          },
        }
      );
      console.log(userResult);
      // Sending the mail
      let userInfo = `Hi ${panCarddata.firstName}, your login credantials have been created .
              your username is : ${panCarddata.email} and your password is ${generatedPassword}. thank you `;

      console.log(userInfo);
      const emailaddress = panCarddata.email;
      await mailer.main(emailaddress, "credentials", userInfo);

      await registerUser({ OrgMSP: "org1MSP", userId: emailaddress });

      res.status(200).json({
        status_code: 200,
        message: "MBE account created successfully",
      });
      return;
    } else if (nseData) {
      var userResult = await UserModel.updateOne(
        { phoneNumber },
        {
          $set: {
            firstName: nseData.firstName,
            lastName: nseData.lastName,
            fatherName: nseData.fatherName,
            Nationality: nseData.Nationality,
            panCard: nseData.panCard,
            aadharCard: nseData.aadharCard,
            gender: nseData.gender,
            address: nseData.address,
            DOB: nseData.DOB,
            password: hashedpassword,
            role: "investor",
            mbe_id: nseData.email,
            nse_registered: true,
          },
        }
      );
      console.log(userResult);
      // Sending the mail
      let userInfo = `Hi ${nseData.firstName}, your login credantials have been created .
              your username is : ${nseData.email} and your password is ${generatedPassword}. thank you `;

      console.log(userInfo);
      const emailaddress = nseData.email;
      await mailer.main(emailaddress, "credentials", userInfo);

      await registerUser({ OrgMSP: "org1MSP", userId: emailaddress });

      res.status(200).json({
        status_code: 200,
        message: "NSE account created successfully",
      });
    }

    const userData = {
      Id: generateId(),
      Participant_id: generateId(),
      CreatedOn: new Date(),
      CreatedBy: "admin",
      IsDelete: false,
      FirstName: panCarddata.firstName,
      LastName: panCarddata.lastName,
      FatherName: panCarddata.fatherName,
      Nationality: panCarddata.Nationality,
      Email: panCarddata.email,
      PhoneNumber: panCarddata.phoneNumber,
      Gender: panCarddata.gender,
      Address: panCarddata.address,
      DOB: panCarddata.DOB,
      role: "investor",
    };
    console.log(userData);

    console.log(userData);


    // userResult = { ...userResult._doc };
    const userResult1 = await UserModel.findOne({ panCard }).select(
      "-password"
    );

    console.log(userResult1);
  } catch (err) {
    res.send("Unexpected Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  let exiRes = await UserModel.findOne({
    email,
  });

  console.log({ exiRes });

  if (exiRes) {
    //Check password
    bcrypt.compare(password, exiRes.password).then((isMatch) => {
      if (isMatch) {
        //User matched
        const payload = {
          userId: exiRes._id,
          email: exiRes.email,
          role: exiRes.role,
        }; //Create JWT Payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600000 },
          (err, token) => {
            res.status(200).json({
                success: true,
                userId: exiRes._id,
                token: "Bearer " + token,
              //   role: exiRes.role,
              //   firstName: exiRes.firstName,
              //   lastName: exiRes.lastName,
              status_code: 200,
              message: "Login Successfully",
              role: exiRes.role,
            });
          }
        );
      } else {
        return res
          .status(200)
          .json({ success: false, message: "Password Incorrect" });
      }
    });
  } else {
    return res.status(200).json({ success: false, message: "User not found" });
  }
};

exports.getInvestor = async (req, res) => {
  try {
    // let { orgId } = req.user || "org1MSP";
    // let { id } = req.query || "";

    // let filter = { role: "investor" };

    // if (id && id != "") filter["_id"] = id;

    let users = await UserModel.find().select("-password ");
    res.status(200).json({
      status: 200,
      message: users,
    });
  } catch (err) {
    HandleResponseError(err, res);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  let exiRes = await UserModel.findOne({
    email,
  });

  console.log(exiRes);
  let generatedPassword = "pwd_" + email.split("@")[0];
  if (exiRes) {
    const payload = {
      userId: exiRes._id,
      email: exiRes.email,
      role: exiRes.role,

      generatedPassword: generatedPassword,
    };
    let text = JSON.stringify(payload);
    res.status(200).json({
      success: true,
      status: 200,
      message: "you password has been sent to your mail ID",
    });

    let userInfo = `Hi ${email},  your password is ${generatedPassword}. thank you `;
    mailer.main(email, "password", userInfo);
  } else {
    res.status(200).json({
      success: true,
      status: 200,
      message: "User not found! ",
    });
  }
};

exports.InvestorDetails = async (req, res) => {
  try {
    let { email } = req.query;

    let user = await UserModel.findOne({ email });
    res.status(200).json({
      status: 200,
      message: user,
    });
  } catch (err) {
    HandleResponseError(res, err);
    res.send(err);
  }
};
