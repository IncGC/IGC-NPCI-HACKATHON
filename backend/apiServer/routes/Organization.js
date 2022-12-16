const router = require("express").Router();
const moment = require("moment");
const bcrypt = require("bcryptjs");

const invoke = require("../app/invoke");
const {
  validate,
  OrganizationValidations,
} = require("../utils/Validators");
const {
  CHAINCODE_ACTIONS,
  USER_ROLES,
  USER_STATUS,
  CHAINCODE_NAMES,
} = require("../utils/helper");
// const { OrganizationModel, UserModel } = require("../models");
const OrganizationModel = require('../models/Organization');
const UserModel= require('../models/User')
const {
  HandleResponseError,
  RequestInputError,
  ObjectExistsError,
} = require("../utils/HandleResponseError");
const { registerUser } = require("../app/registerUser");

const mailer=require('../utils/Mailer');




router.post("/createOrg", validate(OrganizationValidations), async (req, res) => {
  try {
    const {
      FirstName,
      SurName,
      PhoneNumber,
      BusinessEmail,
      CompanyName,
      CompanySize,
      Country,
      State,
      LicenseKey,
    } = req.body;

    // chekcing for license key
    if (!["ABC", "XYZ"].some((key) => key == LicenseKey)) {
      throw new RequestInputError({
        code: 400,
        message: "Invalid license key",
      });
    }

    let exists = await UserModel.find({ businessEmail: BusinessEmail });

    if (exists.length > 0) {
      throw new ObjectExistsError({
        message: "User with this email already exists",
      });
    }

    // 1.save to organization collection first
    const orgData = {
      companyName: CompanyName,
      companySize: CompanySize,
      country: Country,
      state: State,
      licenseKey: LicenseKey,
      msp:CompanyName
    };

    let organizationResult = await OrganizationModel.create(orgData);

    // 2.save to user collection
    const salt = await bcrypt.genSalt(10);
    let generatedPassword = "pwd_" + BusinessEmail.split("@")[0];
    let hashedpassword = await bcrypt.hash(generatedPassword, salt);

    const userData = {
      firstName: FirstName,
      lastName: SurName,
      email: BusinessEmail,
      password: hashedpassword,
      phoneNumber: PhoneNumber,
      role: USER_ROLES.ADMIN,
      status: USER_STATUS.ACTIVE,
      organization: organizationResult._id,
      msp:CompanyName
    };

    let userResult = await UserModel.create(userData);

    // 3. send password via email

    let userInfo=`Hi ${FirstName}, your login credantials have been created .
    your username is : ${BusinessEmail} and your password is ${generatedPassword}. thank you `

     await mailer.main(BusinessEmail, "credentials", userInfo)

    // 4. IMPORTANT - register user in wallet
    await registerUser({ OrgMSP: CompanyName, userId: BusinessEmail });

    // 5. save the obj to blockchain
    const data = {
      FirstName,
      SurName,
      PhoneNumber,
      BusinessEmail,
      CompanyName,
      CompanySize,
      Country,
      State,
      LicenseKey,
      Id: organizationResult._id,
      Participant_id: "",
      CreatedOn: moment(new Date()).format(),
      CreatedBy: "admin",
      IsDelete: "false",
      Notes: "some notes",
    };

    let message = await invoke.invokeTransaction({
      metaInfo: { userName: BusinessEmail, org: CompanyName },
      organizationName: CompanyName,
      channelName: "common",
      chainCodeName: CHAINCODE_NAMES.ORGANIZATION,
      chainCodeFunctionName: "create",
      data,
      chainCodeAction: CHAINCODE_ACTIONS.CREATE,
    });

    console.log({ message });

    res
      .status(201)
      .json({ ...organizationResult._doc, user: { ...userResult._doc } });
  } catch (err) {
    HandleResponseError(err, res);
  }
});
router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  let exiRes = await UserModel.findOne({
    email,
    status: USER_STATUS.ACTIVE,
  }).populate("organization", "companyName");

  console.log(exiRes);
  let generatedPassword = "pwd_" + email.split("@")[0];
  if (exiRes) {
    const payload = {
      userId: exiRes._id,
      email: exiRes.email,
      role: exiRes.role,
      msp: exiRes.organization.companyName,
      orgId: exiRes.organization._id,
      generatedPassword: generatedPassword,
    };
    // res.send("Your password has been successfully sent to your registered mail ID");
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
});




module.exports = router;
