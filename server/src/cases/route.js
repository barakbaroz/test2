const express = require("express");
const router = express.Router();
const {
  create,
  comment,
  duplicate,
  search,
  deleteCase,
} = require("./controller");
const { verifyToken } = require("../stuffMembers/authorization");

router.use(verifyToken);

router.post("/create", create);
router.post("/comment", comment);
router.post("/duplicate", duplicate);

router.post("/search", search);

router.delete("/deleteCase", deleteCase);

module.exports = router;
