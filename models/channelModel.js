const mongoose = require("mongoose");

const { Schema } = mongoose

const channelSchema = new Schema({
    name : {
        type : String
    },
    about : {
        type : String
    },
    address : {
        type : String
    },
    websiteLink : {
        type : String
    },
    videos :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "videoSchema"
        }
    ],
    image : {
        type : String
    },
    subscribers : {
        type : Number,
        default : 0
    },
    owner : {
        type : String
    }
})  

module.exports = mongoose.model("channel",channelSchema)