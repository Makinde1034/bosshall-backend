const channel = require("../models/channelModel.js")
const user = require("../models/userModel")
const { uploads } = require("../config/cloudinaryConfig.js")
const ErrorResponse = require("../utils/errorResponse.js")

exports.createChannel = async (req,res,next) => {
    const { name, about, address, websiteLink } = req.body
  
    const channelImage = await uploads(req.body.image);

    channel.create({
        name, 
        about,
        address,
        websiteLink,
        owner : req.user_id,
        image : channelImage.url
    }).then((result)=>{

        return user.findByIdAndUpdate(
            {_id : req.user_id},
            {
                $push:{
                    channels : result._id
                }
            }
            
        ).then(()=>{
            res.status(200).json(result)
        })
    })
 
    

    
}    

exports.getChannel =async(req,res,next)=>{
    const channelFound = await channel.findById({_id : req.params.id})
    console.log(channelFound)

    if(!channelFound){
        return next( res.json(new ErrorResponse("Channel not found") ) )
    }

    res.status(200).json(channelFound)
}

// desc get videos from channel
// dest GET api/get-channel-videos
// access public
exports.getChannelvideos = (req,res,next) =>{
    channel.findById(req.params.id).populate("videos").then((result)=>{
        res.status(200).json(result)
    })
} 

// desc get a users channels
// dest GET api/get-user-channels
exports.getUserChannels =(req,res,next) =>{
    user.findById({_id : req.params.id}).populate("channels").then((result)=>{
        res.status(200).json(result)
    })
}