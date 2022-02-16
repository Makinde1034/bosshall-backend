const Subscription = require("../models/subscribtionModel")
const User = require("../models/userModel")
const ErroeResponse = require("../utils/errorResponse")


exports.createSubscription = async (req,res,next) =>{

    const { channelId } = req.body 

    const user = await User.findOne({_id : req.user_id});

    const presentUserChannel = await user.channels.find((i) => i.toString() === channelId );

    if(presentUserChannel){
        return res.status(404).json(new ErroeResponse("You cannot subscribe to your own channel"))
    }



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

    res.status(200).json({success : true, data : newSubscription});
}