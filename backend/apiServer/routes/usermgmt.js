const express = require("express");
var router = express.Router();
const { registerUser } = require("../app/registerUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const helper = require("../utils/helper");
const passport = require("passport");
var moment = require("moment");
const mailer = require("../utils/Mailer");
const {
  USER_STATUS
} = require("../utils/helper");

const UserModel = require("../models/User");
const {
  HandleResponseError,
  ObjectExistsError,
} = require("../utils/HandleResponseError");
const { response } = require("express");

var logger = helper.getLogger("Routes");

router.post("/createUser", async (req, res) => {
  try {
    let { firstName, lastName, email, phoneNumber, role } = req.body;
    // let { userId, msp, orgId } = req.user

    let exists = await UserModel.find({ email: email });
    // registering in wallet
    await registerUser({ OrgMSP: "org1MSP", userId: email });

    if (exists.length > 0) {
      throw new ObjectExistsError({
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    let generatedPassword = "pwd_" + email.split("@")[0];
    // let generatedPassword = "pwd_"

    let hashedpassword = await bcrypt.hash(generatedPassword, salt);
    let msp = "org1MSP";
    const userData = {
      firstName,
      lastName,
      email,
      password: hashedpassword,
      phoneNumber,
      role,
      status: USER_STATUS.ACTIVE,
      // organization: "org1MSP",
      msp: msp,
      // createdBy: "userId"
    };

    let userResult = await UserModel.create(userData);
    // Sending the mail
    let userInfo = `Hi ${firstName}, your login credantials have been created .
      your username is : ${email} and your password is ${generatedPassword}. thank you `;

    await mailer.main(email, "credentials", userInfo);

    // registering in wallet
    await registerUser({ OrgMSP: "org1MSP", userId: email });

    userResult = { ...userResult._doc };

    delete userResult["password"];

    res.status(200).json(userResult);
  } catch (err) {
    HandleResponseError(err, res);
  }
});

router.get(
  "",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { orgId } = req.user || "org1MSP";
      let { id } = req.query || "";

      let filter = { organization: orgId, status: "active" };

      if (id && id != "") filter["_id"] = id;

      let users = await UserModel.find(filter).select(
        "-password -organization"
      );
      res.status(200).json(users);
    } catch (err) {
      HandleResponseError(err, res);
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let exiRes = await UserModel.findOne({
    email,
    status: helper.USER_STATUS.ACTIVE,
  }).populate("organization", "companyName");

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
          // msp: exiRes.organization.companyName,
          // orgId: exiRes.organization._id
        }; //Create JWT Payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600000 },
          (err, token) => {
            res.json({
              success: true,
              userId: exiRes._id,
              token: "Bearer " + token,
              role: exiRes.role,
              firstName: exiRes.firstName,
              lastName: exiRes.lastName,
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
});

router.get(
  "",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { orgId } = req.user || "org1MSP";
      let { id } = req.query || "";

      let filter = { organization: orgId, status: "active" };

      if (id && id != "") filter["_id"] = id;

      let users = await UserModel.find(filter).select(
        "-password -organization"
      );
      res.status(200).json(users);
    } catch (err) {
      HandleResponseError(err, res);
    }
  }
);

router.post(
  "/changePassword",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var mongodb = global.db;
    var modifed_on = moment(new Date()).format();
    var modifed_by = req.user.email;
    const salt = await bcrypt.genSalt(10);
    var hashedpassword = await bcrypt.hash(req.body.newpassword, salt);
    var query = { email: req.body.email };
    var newValues = {
      $set: {
        password: hashedpassword,
        modified_on: modifed_on,
        modified_by: modifed_by,
      },
    };

    mongodb
      .collection("users")
      .updateOne(query, newValues, function (err, exiRes) {
        if (exiRes["result"].n > 0) {
          let response = {
            success: true,
            message: "Password changed successfully for the given user",
          };
          console.log(exiRes["result"]);
          res.status(200).json(response);
        } else {
          let response = {
            success: false,
            message: "No Such User Exists or Operation Failed",
          };
          res.status(200).json(response);
        }
      });
  }
);

router.post(
  "/editUser",
  passport.authenticate("jwt", { session: false }),
 async (req, res) => {
    var mongodb = global.db;
    var query = { email: req.body.email };
    var modifed_on = moment(new Date()).format();
    var modifed_by = req.user.email;
    var newValues = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        modified_on: modifed_on,
        modified_by: modifed_by,

      },
    };

    mongodb
      .collection("users")
      .updateOne(query, newValues, function (err, exiRes) {
        if (exiRes["result"].n > 0) {
          let response = {
            success: true,
            message: "User info changed successfully",
          };
          console.log(exiRes["result"]);
          res.status(200).json(response);
        } else {
          let response = {
            success: false,
            message: "No Such User Exists or Operation Failed",
          };
          res.status(200).json(response);
        }
      });
  }
);

router.get("/getUserDetails", async (req, res) => {
  try {
    var mongodb = global.db;

    mongodb
      .collection("users")
      .find(
        { email: req.body.email },
        {
          projection: {
            _id: 1,
            profileImg: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
            role: 1,
            status: 1,
          },
        }
      )
      .toArray(async function (err, exiRes) {
        if (exiRes.length > 0) {
          response = { success: true, message: exiRes };
          return res.status(200).json({
            status: "Success",
            results: exiRes.length,
            data: { response },
          });
        } else {
          response = { success: false, message: "No Active user exists" };
          res.status(200).json(response);
        }
      });
  } catch (err) {
    HandleResponseError(res, err);
    res.send(err);
  }
});

module.exports = router;
