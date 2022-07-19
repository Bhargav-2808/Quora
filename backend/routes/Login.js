import loginDB from "../models/Login.js";
import bcrypt from "bcrypt";
import  mongoose  from "mongoose";


const loginRouter = async (req, res) => {
  const lemail = req.body.email;
  const password = req.body.password;
  
  try {
    const luser = await loginDB.findOne({ email: lemail });
    console.log(luser)
    if (luser) {
      const decrypted = bcrypt.compareSync(password, luser.password);
      if (decrypted) {
        res.status(200).json({ Success: "Login Successfull.", user: luser });
      } else {
        res.status(400).json({ Error: "Login Using Correct Credentials." });
      }
    } else {
      res.status(400).json({ Error: "No User Found." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const registerRouter = async (req, res) => {
  const name = req.body.name;
  const uemail = req.body.email;
  const pass = req.body.password;
  const cpass = req.body.cpassword;
  const phone = req.body.phone;
  const college = req.body.college;

  try {
    const userExist = await loginDB.findOne({ email: uemail });
    if (userExist) {
      res.status(400).json({ Error: "User Alreay Exist" });
    } else {
      if (pass == cpass) {
        const salt = bcrypt.genSaltSync(10);
        const encrypted = bcrypt.hashSync(pass, salt);

        const newUser = await new loginDB({
          _id: new mongoose.Types.ObjectId(),
          name: name,
          phone: phone,
          college: college,
          email: uemail,
          password: encrypted,
        });
       
        const user = await newUser.save();

        try {
          if (user) {
            res.status(200).json({ Success: "user added" });
          }
        } catch (error) {
          res.status(500).json(error.message);
        }
      } else {
        res.status(402).json({ Error: "Both password should be same" });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { loginRouter, registerRouter };
