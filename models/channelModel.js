const mongoose = require("mongoose");

const { Schema } = mongoose

const channelSchema = new Schema({
    name : {
        type : String
    },
    about : {
        type : String
    },
    videos : {

    },
    image : {
        type : String
    },
    subscribers : {
        type : Number
    },
    owner : {
        type : String
    }
})  

module.exports = mongoose.model("channel",channelSchema)