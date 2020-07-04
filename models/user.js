const Mongoose = require("mongoose");

const userSchema = require("../helpers/Schema/UserSchema").userSchema;
const utils = require("../helpers/utility/utils");

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
    return error;
  }
}

module.exports = {
  create
}