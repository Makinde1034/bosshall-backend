const express = require("express");
const mongoose = require("mongoose")
const video = require("./models/videoModel.js")
const fs = require("fs")
const colors = require("colors");
const cors = require("cors");
const Multer = require("multer");
const { uploads } = require('./config/cloudinaryConfig.js');
const videoModel = require("./models/videoModel.js");
const path = require("path")
const bcrypt = require("bcrypt")
const authRoute = require("./routes/userRoute.js")
const channelRoute = require("./routes/channelRoute.js")
const videoRoute = require("./routes/videoRoute")
const subscriptionRoute = require("./routes/subscriptionRoute")
const commentRoute = require("./routes/commentRoute")
const likeRoute = require("./routes/likeRoute")
const replyRoute = require("./routes/replyRoute")


require("dotenv").config();


const uri = "mongodb+srv://makinde1034:makinde1034@react-vid.dvalo.mongodb.net/React-vid?retryWrites=true&w=majority"


const app = express()

app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended : true}));
app.use(authRoute);
app.use(channelRoute);
app.use(videoRoute);
app.use(subscriptionRoute);
app.use(commentRoute);
app.use(likeRoute);
app.use(replyRoute);

const port = process.env.PORT || 7000

 
mongoose.connect(uri).then(()=>{
    console.log('Connected to Mongodb'.rainbow)   
    app.listen(port,()=>{
        console.log(`Listening on port ${port}`.brightYellow)      
    })
}).catch((err)=>{
    console.log(err)
})


 