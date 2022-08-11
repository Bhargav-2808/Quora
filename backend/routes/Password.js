import nodemailer from 'nodemailer'
import loginDB from "../models/Login.js";
import bcrypt from "bcrypt";
import { uuid } from 'uuidv4'
let otpCode;

const sendOTP = async(req,res) =>{
    try {
        const { email } = req.body;
        const userExist = await loginDB.findOne({email});
        if(!userExist){
            return res.status(404).json({Message:"No User Found"});
        }
        otpCode=Math.floor(100000 + Math.random() * 900000);
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
            user: testAccount.user, 
            pass: testAccount.pass
            }
        });
        const resetToken = uuid();
        const updatedUser = await loginDB.findOneAndUpdate({email},{$set:{reset_token:resetToken,reset_otp:otpCode}},{new:true,upsert: false});
        const mail = await transporter.sendMail({
        from: '"Reset Password"', 
        to: email, 
        subject: "Reset Password - Team Quora.",
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset Password</title>
        </head>
        <body>
            Hi ${updatedUser.name},
            <br>
            There was a request to change your password!

            If you did not make this request then please ignore this email.
            <br>
            <br>
            Your OTP is <b>${otpCode}</b> for reseting your password.
            <br>
            <br>
            Thanks, Quora Team.
        </body>
        </html>`
        })
        if(mail){
            return res.status(200).json({Message: nodemailer.getTestMessageUrl(mail),resetToken});
        }
        else{
            return res.status(500).json({Message:"Something Went Wrong"});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const verifyOtpAndUpdate = async(req,res) =>{
    try {
        const {token,otp,password} = req.body;
        const userExist = await loginDB.findOne({reset_token:token})
        if(!userExist){
            return res.status(404).json({Message:"No User Found"});
        }
        if(otp==userExist.reset_otp){
            const salt = bcrypt.genSaltSync(10);
            const encrypted = bcrypt.hashSync(password, salt);
            const updatedUser = await loginDB.findOneAndUpdate({reset_token:token},{$set:{password:encrypted}},{new:true});
            if(updatedUser){
                await loginDB.findOneAndUpdate({reset_token:token},{$unset:{reset_token:"",reset_otp:""}},{new:true});
                res.status(200).json({Message:"Password Updated Successfully"}) 
            }
            else{
                res.status(400).json({Message:"Error in updating password"}) 
            }
        } 
        else{
            res.status(400).json({Message:"Enter correct otp"}) 
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}
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
