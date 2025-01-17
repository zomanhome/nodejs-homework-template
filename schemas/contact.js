const Joi = require("joi")

const name = Joi.string()
  .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/)
  .message("require: Name Surname (40 letters max)")

const email = Joi.string()
  .email({minDomainSegments: 2})
  .message("require: name@domain.domain")

const phone = Joi.string()
  .pattern(/^[0-9]{10,15}/)
  .message("require: 10-15 digits")

const favorite = Joi.boolean().required()

const post = Joi
  .object({
    name: name.required(),
    email: email.required(),
    phone: phone.required(),
  })

const key = Joi.string()

const put = Joi
  .object({
    name,
    email,
    phone,
    key,
  })
  .or("name", "email", "phone")

const patch = Joi
  .object({
    favorite,
    key,
  })

module.exports = {
  post,
  put,
  patch,
}
