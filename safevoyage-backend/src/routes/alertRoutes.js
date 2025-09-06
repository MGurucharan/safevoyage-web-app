const express = require("express");
const { createPanicAlert, getUserAlerts } = require("../controllers/alertController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/panic", protect, createPanicAlert);
router.get("/", protect, getUserAlerts);

module.exports = router;
