const express = require("express");
const { register } = require("../controllers/userController.js")

const userRoute = express.Router()

userRoute.post("/api/register",register)

module.exports = userRoute