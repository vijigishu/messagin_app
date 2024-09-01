const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req,res) => {
    const {username , password , pic} = req.body;

    if(!username || !password){
        res.status(400);
        throw new Error("Please enter all the Fields");
    }

    const userExists = await User.findOne({username});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        username,
        password,
        pic,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Failed to create user');
    }
});

const authUser = asyncHandler(async (req,res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
          });
    }else{
        res.status(401);
        throw new Error("Invalid username or password");
    }
})

module.exports = { registerUser , authUser };