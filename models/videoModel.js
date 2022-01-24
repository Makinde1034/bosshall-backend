const mongoose = require("mongoose")

const Schema = mongoose.Schema

const videoSchema = new Schema({
    name:{
        type : String
    },
    url :{
        type : String
    }
})

module.exports = mongoose.model('videoSchema',videoSchema);