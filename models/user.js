const {Schema, model} = require("mongoose")

const user = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 40,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verification token required"],
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

module.exports = model("User", user)