const video = require("../models/videoModel");
const Comment = require("../models/comment");
const user = require("../models/userModel");
const mongoose = require("mongoose")

// @desc create comment; 
// @dest api/create-comment
// @accesss authenticated users
exports.createComment = async (req,res,next) => {
    const { comment, videoId } = req.body
    const newComment = await Comment.create({ comment : comment, owner : req.user_id, videoId : videoId  }); 

    const updateVideo = await video.findByIdAndUpdate(
        {_id : videoId},
        {
            $push:{
                comments : newComment._id
            }
        }
    )

    res.status(200).json({msg : "comment successfully added"}) 
} 

 
// @desc get video comments
// @dest api/get-video-comments
// @access public

exports.getVideoComments = async (req,res,next) =>{

    try{
        
        const _comments = await Comment.aggregate([
            {
                $match : {
                    videoId : mongoose.Types.ObjectId(req.params.id)
                }
            },
            { 
                $lookup : {
                    from : "users",
                    foreignField : "_id",
                    localField : "owner",
                    as : "users"
                }
            },
            {$unwind: { path: '$users', preserveNullAndEmptyArrays: true }}
        ])  

        res.status(200).json(_comments); 

    }catch(err){
        
        
    }
  
    
}    




exports.getCommentReplies = async (req,res,next) => {
    try{



    }catch(err){

    }
}