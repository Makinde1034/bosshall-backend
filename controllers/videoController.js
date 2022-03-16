const video = require("../models/videoModel");
const channel = require("../models/channelModel");
const { uploads } = require("../config/cloudinaryConfig")

exports.uploadVideo = async (req,res,next) =>{
    try{

        const uploadedVideo = await uploads(req.body.video)

        if(!uploadedVideo){ 
            return next(res.json("error uploading video"))
        }
        console.log(uploadedVideo)

        const chan = await channel.findById({_id : req.body.channelId})

        if(uploadedVideo.url === undefined){
            return  res.status(400).json({msg : "video upload failed"})
        }

        const newVideo = await video.create({
            title : req.body.title,
            url : uploadedVideo.url,
            channelId : req.body.channelId,
            channelImage : chan.image,
            channelName : chan.name  
        })

        


        if(newVideo ){
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
    }catch(err){
        console.log(err)
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

    await video.findByIdAndUpdate(
        {_id : req.params.id},
        {$inc:{views : 1}}
    )

    res.status(200).json({
        vid
    })

}

exports.searchVideo = async(req, res, next) => {

    try{ 
        console.log(req.query)
        // const y = video.createIndex({title:"text"})
        const searchedVideo = await video.find({$text : { $search : req.query.text  }})

        res.status(200).json(searchedVideo);
       
        
    }catch(err){
        console.log(err.message)
    }
}