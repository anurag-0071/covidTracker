const Mongoose = require("mongoose");

const userDefinition = {
  name: String,
  email: String,
  lastUpdated: Date,
  createdAt: {
    type: Date,
    default: new Date()
  }
}

const userSchema = new Mongoose.Schema(userDefinition);

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = {
  userSchema,
}
