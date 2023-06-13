const { StaffMembers } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("./service");

module.exports.info = async (req, res) => {
  try {
    const { id: staffMembersId } = req.staffMembers;
    const result = await service.info({ staffMembersId });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staffMembers = await StaffMembers.findOne({
      where: { email: email.toLocaleLowerCase() },
    });
    if (!staffMembers) return res.status(403).send("Forbidden");

    if (bcrypt.compareSync(password, staffMembers.password)) {
      const { id, name } = staffMembers;
      const token = jwt.sign({ id, name, email }, process.env.JWT_KEY);
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .redirect("Successfully login");
    }
    return res.status(403).send("Forbidden");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

module.exports.logout = async (req, res) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .send("Successfully logged");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};
