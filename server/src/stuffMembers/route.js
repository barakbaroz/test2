const express = require("express");
const router = express.Router();
const { login, logout, casesCount, info } = require("./controller");
const { verifyToken } = require("./authorization");

router.post("/login", login);
router.get("/logout", logout);

router.use(verifyToken);

router.post("/casesCount", casesCount);
router.get("/info", info);

module.exports = router;
