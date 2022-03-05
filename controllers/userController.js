const user = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const ErrorResponse = require("../utils/errorResponse.js")
const {uploads } = require("../config/cloudinaryConfig")



//desc Signup user 
//dest POST /api/register 
exports.register = async (req,res,next) =>{
    const { email,password} = req.body
    const userExist = await user.findOne({email : email})

    if(userExist){
       return  res.status(409).json( new ErrorResponse("User with this email exist",409) ) ;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({email,password : hashedPassword});

    const accessToken = jwt.sign(
        { user_id: newUser._id },
        process.env.ACCESS_TOKEN,
        {expiresIn : "2hr"}
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

    if(!User){
        return res.status(400).json({message : "No user with this email"})
    }

    

    if(User && ( await bcrypt.compare(password,User.password)) ){
        const token = jwt.sign({user_id : User._id},process.env.ACCESS_TOKEN,{expiresIn : "24h"})
    
        return res.status(200).json({
            token,
            User
        })
    }

    next(res.status(400).json(new ErrorResponse("Password is incorrect",403)))
}

//Desc updateuser profile
//dest POST api/update-profile
//Access - authenticated users 
exports.updateProfile= async(req,res,next) =>{
    const {headline,bio,fullname,email,country,address} = req.body
    
    const userImage = await uploads(req.body.userImage);
    const userBanner = await uploads(req.body.userBanner);

    if( !(userImage && userBanner) ){
       return next(res.json(new ErrorResponse("Failed to upload image")))
    }

    user.findByIdAndUpdate(
        {_id : req.user_id},
        {
            $set:{
              headline,
              bio,
              fullname,
              email,
              country,
              address,
              userImage : userImage.url,
              banner : userBanner.url
            }
        },
        { returnOriginal: false },
    ).then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err)
        res.json(err)
    })
}

//desc getUser
//dest GET api/getUser
//access authenticateed users

exports.getUser = async (req,res,next)=>{
    const foundUser = await user.findById({_id : req.user_id});

    if(!foundUser){
        return next(new ErrorResponse("User not found"))
    }

    res.status(200).json(foundUser)
}

