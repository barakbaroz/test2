const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { verifyToken } = require("./authorization");

router.get("/entry/:id", controller.entry);
router.post("/verify", controller.verify);
router.post("/getAuthStatus", controller.getAuthStatus);

router.use(verifyToken);
router.get("/getData", controller.getData);
router.put("/update", controller.update);
router.post("/userAction", controller.userAction);
router.post("/userVideoAction", controller.userVideoAction);
router.post("/updateQuestionnaire", controller.updateQuestionnaire);

module.exports = router;
