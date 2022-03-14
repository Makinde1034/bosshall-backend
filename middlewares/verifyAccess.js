const jwt = require("jsonwebtoken")
const ErrorRespose = require("../utils/errorResponse.js")

exports.verifyAccess = (req,res,next) =>{
    const token = req.headers["x-access-token"]
 
    if(!token){
        return next(res.json(new ErrorRespose("No token found")) )
    }

    jwt.verify(token, process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err){
            return res.status(200).json({auth : false, message : "invalid token"})
        }
        // res.status(200).json({auth : true, message : "valid token"})
        req.user_id = decoded.user_id                                 
        next()
    })

    
}       