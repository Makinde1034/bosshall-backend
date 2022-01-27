const channel = require("../models/channelModel.js")
const { uploads } = require("../config/cloudinaryConfig.js")

exports.createChannel = async (req,res,next) => {
    const { name, about } = req.body
    console.log(req.body)
    const channelImage = await uploads(req.body.data);
    console.log(channelImage)

    const newChannel = await channel.create({
        name,
        about,
        owner : req.user_id,
        image : channelImage.url
    }) 

    res.status(200).json(newChannel)
}    