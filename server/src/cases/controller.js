const casesServices = require("./service");

module.exports.search = async (req, res) => {
  try {
    const { id: creatorId } = req.staffMembers;
    const { search } = req.body;
    const cases = await casesServices.search({
      creatorId,
      search,
    });
    return res.status(200).json(cases);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in Get Cases");
  }
};

module.exports.create = async (req, res) => {
  console.info("Post Case");
  try {
    const { id: creatorId } = req.staffMembers;
    const { body } = req;
    await casesServices.create({ creatorId, ...body });
    return res.status(200).send("Case Created");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in Post Case");
  }
};

module.exports.deleteCase = async (req, res) => {
  try {
    const { id: staffMembersId } = req.staffMembers;
    const { CaseId } = req.body;
    await casesServices.deleteCase({ CaseId, staffMembersId });
    return res.status(200).send("Cases Deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in Delete Case");
  }
};
module.exports.comment = async (req, res) => {
  try {
    const { CaseId, comment } = req.body;
    await casesServices.CommentCase({ CaseId, text: comment });
    return res.status(200).send("comment received");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in Post Comments");
  }
};

module.exports.duplicate = async (req, res) => {
  try {
    const { body } = req;
    const duplicateStatus = await casesServices.duplicate(body);
    return res.status(200).send(duplicateStatus);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in duplicate");
  }
};
