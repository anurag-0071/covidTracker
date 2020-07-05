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

const fetchUsersEmailId = async () => {
  try {
    const users = await userModel.fetch({
      select: "email"
    });
    return users;
  } catch (error) {
    console.error("Error in fetching users from DB", error);
    throw new Error(error.toString());
  }
}

module.exports = {
  createUser,
  fetchUsersEmailId,
}