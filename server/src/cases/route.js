const express = require("express");
const router = express.Router();
const {
  update,
  create,
  CommentCase,
  duplicate,
  search,
  deleteCase,
} = require("./controller");
const { verifyToken } = require("../stuffMembers/authorization");

router.put("/update", update);

router.use(verifyToken);

router.post("/create", create);
router.post("/CommentCase", CommentCase);
router.post("/duplicate", duplicate);

router.post("/search", search);

router.delete("/deleteCase", deleteCase);

module.exports = router;
