const userModel = require("../models/user");

const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await userModel.create(user);
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createUser
}