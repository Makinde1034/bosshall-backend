const express = require("express");
const { register,login } = require("../controllers/userController.js")

const userRoute = express.Router()

userRoute.post("/api/register",register)
userRoute.post("/api/login",login)

module.exports = userRoute 