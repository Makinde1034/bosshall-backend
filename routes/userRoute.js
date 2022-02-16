const express = require("express");
const { register,login,updateProfile,getUser,  } = require("../controllers/userController.js")
const { verifyAccess } = require("../middlewares/verifyAccess")

const userRoute = express.Router()

userRoute.post("/api/register",register)
userRoute.post("/api/login",login)
userRoute.post("/api/update-profile",verifyAccess, updateProfile)
userRoute.get("/api/get-user",verifyAccess, getUser)
userRoute.post("/api/verifyAccess", verifyAccess )

module.exports = userRoute  