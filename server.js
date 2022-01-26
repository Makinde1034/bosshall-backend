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
require("dotenv").config();


const uri = "mongodb+srv://makinde1034:makinde1034@react-vid.dvalo.mongodb.net/React-vid?retryWrites=true&w=majority"


const app = express()

app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended : true}));
app.use(authRoute)

const port = process.env.PORT


mongoose.connect(uri).then(()=>{
    console.log('Connected to Mongodb'.rainbow)  
    app.listen(port,()=>{
        console.log(`Listening on port ${port}`.brightYellow)      
    })
}).catch((err)=>{
    console.log(err)
})


 
const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 8 * 1024 * 1024 // max file size 8MB
    
});



app.post('/upload', multer.single("avatar"), (req,res)=>{
    // console.log(req.body.data)
    return uploads(req.body.data).then((result)=>{ 
        videoModel.create({
            name : "latest video",
            url : result.url
        }).then((newData)=>{
            console.log(newData);
        })
    }) 
    // console.log(req.files) 
})              
