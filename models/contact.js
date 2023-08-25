const {Schema, model} = require("mongoose")

const contact = new Schema(
  {
    key: {
      type: String,
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 40,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {versionKey: false, timestamps: true},
)

module.exports = model("Contact", contact)