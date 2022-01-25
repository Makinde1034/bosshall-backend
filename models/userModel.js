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
    channels : {

    },
    country : {
        type : String,
        required : true
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
    }
})

module.exports = mongoose.model('user',userSchema)