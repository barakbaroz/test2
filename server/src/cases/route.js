const express = require("express");
const router = express.Router();
const {
  update,
  postCase,
  CommentCase,
  search,
  deleteCase,
} = require("./controller");
const { verifyToken } = require("../stuffMembers/authorization");

router.put("/update", update);

router.use(verifyToken);

//Modified
//POST
router.post("/create", postCase);
router.post("/CommentCase", CommentCase);

//GET
router.post("/search", search);

//DELETE
router.delete("/deleteCase", deleteCase);

module.exports = router;
