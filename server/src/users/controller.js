const { isUUID } = require("../validator");
const userServices = require("./service");
const jwt = require("jsonwebtoken");

module.exports.getAuthStatus = async (req, res) => {
  try {
    const { userId } = req.body;
    const status = await userServices.getAuthStatus({ userId });
    return res.status(200).send(status);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

module.exports.entry = async (req, res) => {
  try {
    const { id } = req.params;
    const dbUser = await userServices.getData({ userId: id });
    const sending =
      req.params.sending || userServices.getDefaultSendingType(dbUser);
    const authURL = `/Auth/${id}/${sending}/zehut`;
    if (!dbUser) return res.redirect("/notFound");
    userServices.userAction({ UserId: id, type: "opened-sms" });
    const token = req.cookies.user_token;
    if (!token) return res.redirect(authURL);
    try {
      const jwtUser = jwt.verify(token, process.env.JWT_KEY_USER);
      if (jwtUser.id != id) return res.redirect(authURL);
    } catch (error) {
      return res.redirect(authURL);
    }
    const route = await userServices.lastStep({ userId: id, sending });
    return res.redirect(`/user/${sending}/${route}`);
  } catch (error) {
    console.error(error);
    return res.send("Server Error");
  }
};

module.exports.verify = async (req, res) => {
  try {
    const { id, rememberMe } = req.body;
    if (!isUUID(id)) return res.status(400).send("Invalid UUID");
    const { user, status } = await userServices.verify(req.body);
    if (!user)
      return res.status(403).json({ message: "verification failed", status });
    const token = jwt.sign(
      { id },
      process.env.JWT_KEY_USER,
      rememberMe ? { expiresIn: "30d" } : {}
    );
    const maxAge = rememberMe ? 1000 * 60 * 60 * 24 * 30 : undefined;
    return res
      .cookie("user_token", token, { httpOnly: true, maxAge })
      .status(200)
      .send("Successfully verify");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

module.exports.getData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userServices.getData({ userId });
    if (!user) return res.status(404).send("Not user found");
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.user;
    const data = req.body;
    await userServices.update({ id, data });
    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

module.exports.userAction = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { type, data } = req.body;
    await userServices.userAction({ UserId, type, data });
    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

module.exports.userVideoAction = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { type, data } = req.body;
    await userServices.userVideoAction({ UserId, type, data });
    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

module.exports.updateQuestionnaire = async (req, res) => {
  try {
    const { id } = req.user;
    const { answers, type } = req.body;
    await userServices.updateQuestionnaire({ id, answers, type });
    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};
