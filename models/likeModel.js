const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref :"user"
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "videoSchema"
    },
    status : {
        type : String,
        default : "nil",
    }
})

module.exports = mongoose.model("like",likeSchema)