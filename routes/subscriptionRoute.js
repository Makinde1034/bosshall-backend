const subscriptionRoute = require("express").Router();
const { createSubscription, checkSubscription } = require("../controllers/subscribtionController");
const { getUserNotifications } = require("../controllers/subscriptionNotificationController")
const { verifyAccess } = require("../middlewares/verifyAccess")


subscriptionRoute.post("/api/subscribe", verifyAccess, createSubscription);
subscriptionRoute.post("/api/check-subscription", verifyAccess, checkSubscription);
subscriptionRoute.get("/api/get-notifications",verifyAccess, getUserNotifications);

module.exports = subscriptionRoute;


  