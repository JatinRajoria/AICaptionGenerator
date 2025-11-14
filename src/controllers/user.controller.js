const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function registerController(req,res){
    const {username, password} = req.body;

    const isuserAlreadyExists = await userModel.findOne({
        username
    })

    if(isuserAlreadyExists){
        return res.status(409).json({
            message: "Username already exists"
        })
    }

    const userCreation = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

   const token = jwt.sign(
    { id: userCreation._id },
    process.env.JWT_SECRET
);


    res.cookie('token', token);

    res.status(201).json({
        message: "user registerd successfully",
        user: userCreation
    })
}

async function  loginController(req, res) {
    const {username, password} = req.body;
    const isUser = await userModel.findOne({username});

    if(!isUser){
        res.status(400).json({
            message: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,isUser.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({id: isUser._id}, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(200).json({
        message: "user logged in successfully",
        user:{
            username: isUser.username,
            id: isUser._id
        }
    })
}

module.exports = {
    registerController,
    loginController
}
