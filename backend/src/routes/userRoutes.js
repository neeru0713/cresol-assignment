const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");
const authenticateUser = require("../middlewares/authenticateUser");
const eventController = require("../controllers/eventController");

router.post("/register", validateUser, userController.registerUser);
router.get("/:userId", authenticateUser, eventController.getUserEvents);
router.get("/:userId/notifications", userController.getAllNotifications);
router.post("/:userId/notifications", userController.pushNotification);

module.exports = router;
