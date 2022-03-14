const mongoose = require("mongoose")

const replySchema = mongoose.Schema({

    commentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "comment"
    },

    reply : {
        type : String
    },

    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model("reply", replySchema)