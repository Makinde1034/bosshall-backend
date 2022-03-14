const express = require("express")
const { uploadVideo,getRandomVideos, getVideo, searchVideo } = require("../controllers/videoController")
const { verifyAccess } = require("../middlewares/verifyAccess")

const videoRoute = express.Router();

videoRoute.post("/api/upload-video",verifyAccess,uploadVideo);
videoRoute.get("/api/get-random-videos",getRandomVideos);
videoRoute.get("/api/get-video/:id",getVideo );
videoRoute.get("/api/search-video",searchVideo );

module.exports = videoRoute   