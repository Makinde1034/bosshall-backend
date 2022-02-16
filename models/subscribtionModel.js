const mongoose = require("mongoose");

const { Schema } = mongoose;

const subscribtionSchema = new Schema({
    subscriberId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    
    channelId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "chanel"
    }

})

module.exports = mongoose.model("subscribtion",subscribtionSchema);