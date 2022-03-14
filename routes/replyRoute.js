const replyRoute = require("express").Router()
const { verifyAccess } = require("../middlewares/verifyAccess")
const { createReply, getCommenttReplies } = require("../controllers/replyController")

replyRoute.post("/api/create-reply", verifyAccess, createReply)
replyRoute.get("/api/get-comment-replies/:commentId", getCommenttReplies)

module.exports = replyRoute     