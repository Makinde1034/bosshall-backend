const mongoose = require("mongoose");

const {Schema} = mongoose
 
const userSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    channels :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "channel"
        }
    ],
    country : {
        type : String,
        
    },
    address : {
        type : String,

    },
    fullname : {
        type : String
    },
    bio : {
        type : String
    },
    headline : {
        type : String
    },
    userImage : {
        type : String
    },
    banner : {
        type : String
    }
})

module.exports = mongoose.model('user',userSchema)