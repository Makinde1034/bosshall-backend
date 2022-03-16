const Like = require("../models/likeModel");
const Video = require("../models/videoModel")




//@desc like or unlike a post
//@dest api/likeUnlike
//@access Authenticated users

exports.likeUnlikeVideo = async (req,res,next) => {  

    try{

        const checkState = await Like.findOne({ owner : req.user_id, reciever : req.body.reciever})
        // check if document does not exist
        if(checkState !== null){ 
            // in the case where it exists check(and also check if the present status sent from frontend is the same as present status), check the status to know if like count or dislike count should be updated and delete the document
            if(checkState.status == req.body.status){
                if(req.body.status == 'liked'){
                    await Like.deleteOne({ owner : req.user_id, reciever : req.body.reciever})
                    await Video.updateOne({_id : req.body.reciever}, {$inc:{likes : -1}} )
                }else{
                    await Like.deleteOne({ owner : req.user_id, reciever : req.body.reciever})
                    await Video.updateOne({_id : req.body.reciever}, {$inc:{dislikes : -1}} )
                }
                
            }else{ // in case where status sent from frontend is different from the present status of the document, check if the status is either 'liked' or 'unliked'
                if(req.body.status == 'liked'){
                    await Video.updateOne({_id : req.body.reciever}, {$inc:{likes : 1,dislikes : -1}} )
                    await Like.updateOne({owner : req.user_id, reciever : req.body.reciever, status : 'liked'});

                }else{
                    await Video.updateOne({_id : req.body.reciever}, {$inc:{dislikes : 1,likes : -1}} )
                    await Like.updateOne({owner : req.user_id, reciever : req.body.reciever, status : 'unliked'});
                }
            }
        }else{
            if(req.body.status == 'liked'){
                await Like.create({owner : req.user_id, reciever : req.body.reciever, status : req.body.status});
                await Video.updateOne({_id : req.body.reciever}, {$inc:{likes : 1}} )
            }else{
                await Like.create({owner : req.user_id, reciever : req.body.reciever, status : req.body.status});
                await Video.updateOne({_id : req.body.reciever}, {$inc:{dislikes : 1}} )
            }
            


        }
        res.status(200).json({status: true})

    }catch(err){
        console.log(err.message) 

        res.status(400).json("An error occured")
    }
}

// @desc check if  user has already liked a video
// @dest api/check-video-like
// @access authenticated users 

exports.checkVideoLike = async (req,res,next) => {

    try{

        const alreadyLiked = await Like.findOne({ owner : req.user_id, reciever : req.body.reciever });
        res.status(200).json({alreadyLiked});
        
    }catch(err){

        res.status(400).json({msg:"An error occured"});
    }
}