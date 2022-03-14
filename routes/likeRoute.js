const likeRoute = require("express").Router()
const { likeUnlikeVideo, checkVideoLike } = require("../controllers/likeController")
const { verifyAccess } = require("../middlewares/verifyAccess")

likeRoute.post("/api/like-unlike",verifyAccess,likeUnlikeVideo);
likeRoute.post("/api/check-video-like",verifyAccess,checkVideoLike);

module.exports = likeRoute  