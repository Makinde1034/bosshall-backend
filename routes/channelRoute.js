const channelRoute = require("express").Router()
const { createChannel,getChannel, getChannelvideos, getUserChannels, getRandomChannels } = require("../controllers/channelController.js")
const { verifyAccess } = require("../middlewares/verifyAccess.js")

channelRoute.post("/api/create-channel",verifyAccess,createChannel);
channelRoute.get("/api/get-channel/:id",getChannel);
channelRoute.get("/api/get-channel-videos/:id",getChannelvideos);
channelRoute.get("/api/get-user-channels/:id",getUserChannels);
channelRoute.get("/api/get-random-channels",getRandomChannels)

module.exports = channelRoute;  