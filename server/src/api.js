const express = require("express");
const router = express.Router();
const cases = require("./cases/route");
const users = require("./users/route");
const sms = require("./sms/route");
const stuffMembers = require("./stuffMembers/route");

router.use("/cases", cases);
router.use("/user", users);
router.use("/sms", sms);
router.use("/stuffMembers", stuffMembers);
router.use("/*", (req, res) => res.status(404).send("api route not found"));

module.exports = router;
