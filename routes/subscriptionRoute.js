const subscriptionRoute = require("express").Router();
const { createSubscription } = require("../controllers/subscribtionController");
const { verifyAccess } = require("../middlewares/verifyAccess")


subscriptionRoute.post("/api/subscribe", verifyAccess, createSubscription);

module.exports = subscriptionRoute;


 