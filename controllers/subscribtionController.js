const Subscription = require("../models/subscribtionModel")
const User = require("../models/userModel")
const ErroeResponse = require("../utils/errorResponse")
const Channel = require("../models/channelModel")
const subscriptionNotification = require("../models/subscriptionNotificationModel")


exports.createSubscription = async (req,res,next) =>{

    try{

    

        const { channelId } = req.body 

        const user = await User.findOne({_id : req.user_id});

        const presentUserChannel = await user.channels.find((i) => i.toString() === channelId );

        // if(presentUserChannel){
        //     return res.status(200).json(new ErroeResponse("You cannot subscribe to your own channel"))
        // }



        const subscriptionExists = await Subscription.findOne({
            channelId,
            subscriberId : req.user_id
        })

        if(subscriptionExists){ 

            await subscriptionExists.remove();
            return res.status(200).json({success : true })
        }

        const newSubscription = await Subscription.create({                                                                                                                                                                                                                                                     
            channelId,
            subscriberId : req.user_id

        })

        // create subscription notification
        const channel = await Channel.findOne({_id : channelId})
       

        await subscriptionNotification.create({
            subscriberImage : user.userImage,
            subscriberName : user.fullname,
            channelName : channel.name,
            channelOwner : channel.owner 
        })

        res.status(200).json({channelName,subscriberName})

        


        res.status(200).json({success : true, data : newSubscription});
    }catch(err){
        res.json({msg : err})
        console.log(err)
    }
}


exports.checkSubscription = async (req,res,next) => {

    try{

        const isSubcribed = await Subscription.exists({ channelId : req.body.channelId, subscriberId : req.user_id  });
        res.status(200).json({data : isSubcribed})

    }catch(err){
        res.status(200).json({msg : err}) 
        console.log(err)
    }
    
} 