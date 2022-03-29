const express = require("express")
const { uploadVideo,getRandomVideos, getVideo, searchVideo, deleteVideo } = require("../controllers/videoController")
const { verifyAccess } = require("../middlewares/verifyAccess")

const videoRoute = express.Router();

videoRoute.post("/api/upload-video",verifyAccess,uploadVideo);
videoRoute.get("/api/get-random-videos",getRandomVideos);
videoRoute.get("/api/get-video/:id",getVideo );
videoRoute.get("/api/search-video",searchVideo );
videoRoute.delete("/api/delete-video/:id",verifyAccess,deleteVideo);

module.exports = videoRoute   