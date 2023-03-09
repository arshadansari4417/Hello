const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please Login to access this resources",401))
    }
    const decodeData = jwt.verify(token,process.env.JWT_SECRET)
    res.user= await User.findById(decodeData.id)
    next();
})

//For admin
exports.authorizedRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(res.user.role)){
           return next( new ErrorHandler(`Role:${res.user.role} is not allowed to access this resources`,403));
        }
        next();
    }
}