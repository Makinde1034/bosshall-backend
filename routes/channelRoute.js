const channelRoute = require("express").Router()
const { createChannel } = require("../controllers/channelController.js")
const { verifyAccess } = require("../middlewares/verifyAccess.js")

channelRoute.post("/api/createChannel",verifyAccess,createChannel)

module.exports = channelRoute;