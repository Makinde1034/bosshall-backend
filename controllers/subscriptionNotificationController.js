const  SubscriptionNotification = require("../models/subscriptionNotificationModel");
const mongoose = require("mongoose")

exports.getUserNotifications = async (req,res,next) =>{    
    
    try{
        const notifications = await SubscriptionNotification.aggregate([
            {
                $match : {
                    channelOwner : mongoose.Types.ObjectId(req.user_id) 
                }
            },
            
        ])

        res.status(200).json({ notifications });
        
    }catch(err){
        console.log(err)
    }

    
}