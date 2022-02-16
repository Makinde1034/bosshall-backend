const mongoose = require("mongoose")

const Schema = mongoose.Schema

const videoSchema = new Schema({

    title:{
        
        type : String
    },
    url :{

        type : String
    },
    likes : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('videoSchema',videoSchema);