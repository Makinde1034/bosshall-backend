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
        type : Number,
        default : 0
    },
    dislikes : {
        type : Number,
        default : 0
    },
    videoId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "videoSchema"
    },
    replies : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "reply"
        }
    ],

    time : { 
        type : Date, 
        default: Date.now 
    }
    
    
})

module.exports = mongoose.model('comment',commentSchema);
