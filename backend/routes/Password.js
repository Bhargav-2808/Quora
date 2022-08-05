import twilio from "twilio";
import loginDB from "../models/Login.js";
import dotenv from "dotenv";
dotenv.config();
console.log(process?.env?.TWILIO_ACCOUNT_SID, process?.env?.TWILIO_TOKEN);
const client = twilio(
  process?.env?.TWILIO_ACCOUNT_SID,
  process?.env?.TWILIO_TOKEN
);

let otpCode;

const sendOTP = async (req, res) => {
  try {
    const { number } = req.body;
    otpCode = Math.floor(100000 + Math.random() * 900000);
    console.log(number);

    client.messages
      .create({
        body: `Dear User, Your OTP is ${otpCode} for reseting your password. Thanks, quora Team.`,
        from: "+12283386259",
        to: `+91${number}`,
      })
      .then((message) =>
        res.status(200).json({
          Message: "OTP sent to your registered mobile number",
          MessageID: message.sid,
        })
      ).done();
    // try {
    //     const luser = await loginDB.findOne({ phone: number });
    //     console.log(luser);
    //     if(luser)
    //     {
    //         otpCode=Math.floor(100000 + Math.random() * 900000);
    //         client.messages
    //         .create({
    //            body: `Dear User, Your OTP is ${otpCode} for reseting your password. Thanks, quora Team.`,
    //            from:'+12283386259',
    //            to: `+91${number}`
    //          })
    //         .then(message =>
    //             res.status(200).json({Message:"OTP sent to your registered mobile number",MessageID:message.sid})
    //         ).done();
    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.status(402).json({ Error: "Not registered Mobile Numbebr"+error.message });
    // }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const verifyOtpAndUpdate = async (req, res) => {
  try {
    const { user, otp, password } = req.body;
    if (otp == otpCode) {
      const updatedUser = await loginDB.findOneAndUpdate(
        { phone: user.phone },
        { $set: { password } },
        { new: true }
      );
      if (updatedUser) {
        res.send(200).json({ Message: "Password Updated Successfully" });
      } else {
        res.send(400).json({ Message: "Error in updating password" });
      }
    } else {
      res.status(400).json({ Message: "Enter correct otp" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { sendOTP, verifyOtpAndUpdate };
