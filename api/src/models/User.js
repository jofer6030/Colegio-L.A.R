const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: "ADMIN",
  },
  estado: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, estado, ...user } = this.toObject();
  return user;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
