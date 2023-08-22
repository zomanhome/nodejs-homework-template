const {mongoose} = require('mongoose')

const contact = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 40,
      required: [true, 'Set name for contact'],
      index: 1,
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    key: {
      type: String,
    }
  },
  {
    versionKey: false,
    timestamps: true
  },
)

module.exports = mongoose.model('Contact', contact)