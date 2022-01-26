const user = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const ErrorResponse = require("../utils/errorResponse.js")



//desc Signup user 
//dest POST /api/register 
exports.register = async (req,res,next) =>{
    const { email,password,channels,country,address,fullname,bio,headline } = req.body
    const userExist = await user.findOne({email : email})

    if(userExist){
       return  next(res.json(new ErrorResponse("User with this email exist",409) ));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({email,country,address,fullname,bio,headline,password : hashedPassword});

    const accessToken = jwt.sign(
        { user_id: newUser._id },
        process.env.ACCESS_TOKEN,
        {expiresIn : "2m"}
    )

    res.status(200).json({
        accessToken,
        newUser
    })


} 

//desc signin user
//dest POST api/signin
exports.login = async (req,res,next) =>{
    const { email,password } = req.body
    const User = await user.findOne({email : email })

    

    if(User && ( await bcrypt.compare(password,User.password)) ){
        const token = jwt.sign({user_id : User._id},process.env.ACCESS_TOKEN,{expiresIn : "24h"})
    
        return res.status(200).json({
            token,
            User
        })
    }

    next(res.json(new ErrorResponse("Password is incorrect",409)))
}