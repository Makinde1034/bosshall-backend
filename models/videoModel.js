const mongoose = require("mongoose");

const Schema = mongoose.Schema

const videoSchema = new Schema({

    title:{

        type : String,
        text: true 
    },
    url :{
        
        type : String
    },
    likes : {
        type : Number,
        default : 0
    },
    views : {
        type : Number,
        default : 0
    },
    dislikes : {
        type : Number,
        default : 0
    },
    channelId : {
        type : String,
    },
    channelImage : {
        type : String 
    }, 
    
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "comment"
    }],
    time : { 
        type : Date, 
        default: Date.now 
    }
}) 



module.exports = mongoose.model('videoSchema',videoSchema); 