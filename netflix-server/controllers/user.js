import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const maxAge = 30 * 24 * 60 * 60 * 1000;
const createToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_KEY, { expiresIn: '30d' });
};

export const Login = async (req, res) => {
  try {
    console.log("trying to logiing")
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid data",
        success: false,
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid credential",
        success: false,
      });
    }
    console.log("user found !")

    const auth =  bcryptjs.compare(password, user.password);

    if (!auth) {
      return res.status(401).json({
        message: "Invalid Credential",
        success: false,
      });
    }

    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      htppsOnly: true,
      sameSite: "None",
    });
    return res
      .status(200)
      .json({ message: `welcome back ${user.fullName}`, success: true,user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server internal error", success: false });
  }
};
export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "Already exists",
        success: false,
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.create({ fullName, email, password: hashedPassword });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server internal error", success: false });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 1,
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });
    console.log("logged Out")
    return res
      .status(200)
      .json({ message: "successfully logged out", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server internal error", success: true });
  }
};

export const getUserInfo=async(req,res)=>{
  try{
    const id=req.userId;
    console.log(id)
    if(!id) return res.status(401).json({success:false,message:"Not authenticated"})
      const user=await User.findById(id);
    console.log(user)
     if(!user){
      return res.status(404).json({success:false,message:"User not found"})
     }
     return res.status(200).json(user);
  }catch(err){
    console.log(err)
    return res.status(500).json({success:false,message:"Server internal error"})
  }
}
