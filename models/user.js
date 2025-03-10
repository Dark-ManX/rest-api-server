const { Schema, model } = require("mongoose");

const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
      default: null,
    },

    avatarURL: String,

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const userRegistration = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  name: Joi.string(),
});

const userLogIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const checkEmail = Joi.string().email();

const schemas = {
  userRegistration,
  userLogIn,
  checkEmail,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
