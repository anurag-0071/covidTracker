const Mongoose = require("mongoose");

const userSchema = require("../helpers/Schema/userSchema").userSchema;
const utils = require("../helpers/utility/utils");
const { Logger } = require("mongodb");

const userModal = Mongoose.model("users", userSchema, "users");

const create = async (
  user = utils.throwIfEmpty("user")
) => {
  try {
    const newUser = await userModal.create(user);
    console.log("Successfully created new user", newUser._id)
    return newUser;
  } catch (error) {
    console.error("Error in creating new user", error);
    throw new Error(error.toString());
  }
}

const fetch = async ({
  filter = {},
  select = ""
}) => {
  try {
    const users = await userModal.find(filter).select(select);
    return users;
  } catch (error) {
    console.error("Error in fetching users", error);
    throw error;
  }
}

module.exports = {
  create,
  fetch,
}