const Reply = require("../models/replyModel")
const Comment = require("../models/comment")
const mongoose = require("mongoose")





exports.createReply = async (req,res,next) => {
    try{
        const reply = await Reply.create({owner : req.user_id, reply: req.body.reply, commentId : req.body.commentId  })

        const update = await Comment.findByIdAndUpdate(
            {_id : req.body.commentId},
            {
                $push:{
                    replies : reply._id
                }
            }
        )

        res.status(200).json({data : reply})
    }catch(err){
        console.log(err) 
    }
} 



exports.getCommenttReplies = async (req,res,next) => {
    try{

        const replies = await Reply.aggregate([
            {
                $match:{
                    commentId : mongoose.Types.ObjectId(req.params.commentId)
                }
            },
            {
                $lookup:{
                    from :  "users",
                    foreignField : "_id",
                    localField : "owner",
                    as : "users"

                }
            },
            {$unwind: { path: '$users', preserveNullAndEmptyArrays: true }}
        ])

        res.status(200).json({data : replies})

    }catch(err){
        res.json({message : 'An error occured'});
    }
}