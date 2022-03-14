const commentRoute = require("express").Router()
const { verifyAccess } = require("../middlewares/verifyAccess")
const { createComment, getVideoComments, createReply } = require("../controllers/commentController")

commentRoute.post("/api/create-comment",verifyAccess,createComment)  
commentRoute.get("/api/get-video-comments/:id",getVideoComments)


module.exports = commentRoute     