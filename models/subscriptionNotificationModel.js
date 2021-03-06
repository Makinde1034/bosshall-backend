const mongoose = require("mongoose")

const subscriptionNotificationModel = mongoose.Schema({
    

    subscriberImage : {
        type : String
    },
    subscriberName :{
        type : String
    },
    
    channelName : {
        type : String
    },

    channelOwner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }, 

    viewed : {
        type :Boolean,
        default : false
    },

    time : { 
        type : Date, 
        default: Date.now 
    }



})

module.exports = mongoose.model("subscriptionNot",subscriptionNotificationModel)