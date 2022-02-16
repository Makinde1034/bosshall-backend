const express = require("express")
const { uploadVideo } = require("../controllers/videoController")
const { verifyAccess } = require("../middlewares/verifyAccess")

const videoRoute = express.Router();

videoRoute.post("/api/upload-video",verifyAccess,uploadVideo)

module.exports = videoRoute