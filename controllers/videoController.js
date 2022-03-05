const video = require("../models/videoModel");
const channel = require("../models/channelModel");
const { uploads } = require("../config/cloudinaryConfig")

exports.uploadVideo = async (req,res,next) =>{
    const uploadedVideo = await uploads(req.body.video)

    if(!uploadedVideo){ 
        return next(res.json("error uploading video"))
    }
    console.log(uploadedVideo)

    const chan = await channel.findById({_id : req.body.channelId})

    const newVideo = await video.create({
        title : req.body.title,
        url : uploadedVideo.url,
        channelId : req.body.channelId,
        channelImage : chan.image,
        channelName : chan.name
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

// @desc get random videos
// @dest api/get-random-videos
// @accss public

exports.getRandomVideos = async (req, res, next) => {

    const videos = await video.aggregate(
        [ 
            { $sample: { size: 6 } } 
        ]
    )

    res.status(200).json({
        videos
    })
}                                                                   


// @desc get specific video
// @dest api/get-video/:_id
// @access public

exports.getVideo = async (req,res,next) =>{
    const vid = await video.findById({_id : req.params.id});

    res.status(200).json({
        vid
    })

}