const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const registerController = async (req,res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email})   //first find the user because we want to login one user with one email id
        //validation
        if(existingUser)
        {
            return res.status(200).send({       //200-ok response
                success:false,
                message:'User Already Exists',
            });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);    //tells no of routes required more no of routes more processing power will be required to decrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        //rest data is accessed
        const user = new userModel(req.body)    //request for new user is sent
        await user.save()       //user is saved
        return res.status(201).send({       //201 something hase been created 
            success:true,
            message:'User Registered Successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            
        });
    }
};

//login call back
const loginController =async (req,res) => {
    try {
        const user = await userModel.findOne({email: req.body.email});
        //validation
        if(!user)
        {
            return res.status(404).send({       //200-error
                success:false,
                message:'Invalid Credentials',
            });
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password,user.password);
        if(!comparePassword){
            return res.status(500).send({
                success: false,
                message:'Invalid Credentials'
            });
        }
        //check role
        if(user.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message: "Role doesn't match",
            });
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn: '1d',});       //token will be valid for 1day after that you have to login again
        return res.status(200).send({
            success: true,
            message:'Login Successful',
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login API',
            error,
        });
    }
};

//GET Current User
const currentUserController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      return res.status(200).send({
        success: true,
        message: "User Fetched Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Unable to get Current User",
        error
      });
    }
  };

//exports
module.exports = { registerController, loginController, currentUserController};