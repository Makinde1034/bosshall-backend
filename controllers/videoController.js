const video = require("../models/videoModel");
const channel = require("../models/channelModel");
const { uploads } = require("../config/cloudinaryConfig")

exports.uploadVideo = async (req,res,next) =>{
    const uploadedVideo = await uploads(req.body.video)

    if(!uploadedVideo){ 
        return next(res.json("error uploading video"))
    }
    console.log(uploadedVideo)

    const newVideo = await video.create({
        title : req.body.title,
        url : uploadedVideo.url
    })

    if(newVideo){
        return channel.findByIdAndUpdate(
            {_id : req.body.channelId},
            {
                $push:{
                    videos : newVideo._id
                }
            }
        ).then(()=>{
            res.status(200).json(newVideo) 
        }) 

         
    }

    

   

    
} 