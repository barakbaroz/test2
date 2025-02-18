const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    req.staffMembers = jwt.verify(token, process.env.JWT_KEY_STAFF_MEMBERS);
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = { verifyToken };
