const mongoose = require("mongoose");

const { Schema } = mongoose

const commentSchema = new Schema({
    comment : {
        type : String,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    likes :{
        type : Number
    },
    videoId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "videoSchema"
    }
    
})

module.exports = mongoose.model('comment',commentSchema);
