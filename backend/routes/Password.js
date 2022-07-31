const accountSid = 'ACbe36619c3ef78d6b16cef80dc2fb0bc0'; 
const authToken = '48723275faa4e26d774d04fdc205ab5e'; 
import twilio from 'twilio';
import loginDB from "../models/Login.js";
const client = twilio(accountSid, authToken); 
let otpCode;

const sendOTP = (req,res) =>{
    try {
        const phoneNumber  = req.body.number;
        otpCode=Math.floor(100000 + Math.random() * 900000);
        client.messages 
        .create({         
           body: `Dear User, Your OTP is ${otpCode} for reseting your password. Thanks, quora Team.`,  
           from:'+12283386259',
           to: `+91${phoneNumber}` 
         }) 
        .then(message =>
            res.status(200).json({Message:"OTP sent to your registered mobile number",MessageID:message.sid}) 
        ); 
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const verifyOtpAndUpdate = async(req,res) =>{
    try {
        const {user,otp,password} = req.body;
        if(otp==otpCode){
            const updatedUser = await loginDB.findOneAndUpdate({ phone: user.phone },{$set:{password}},{new:true});
            if(updatedUser){
                res.send(200).json({Message:"Password Updated Successfully"}) 
            }
            else{
                res.send(400).json({Message:"Error in updating password"}) 
            }
        } 
        else{
            res.status(400).json({Message:"Enter correct otp"}) 
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export {sendOTP,verifyOtpAndUpdate};

