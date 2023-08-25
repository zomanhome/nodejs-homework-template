const Joi = require("joi")

const name = Joi.string()
  .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/)
  .message("require: Name Surname (40 letters max)")

const email = Joi.string()
  .email({minDomainSegments: 2})
  .message("require: name@domain.domain")

const password = Joi.string()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~]).{6,64}$/)
  .message("require: lowercase letter, uppercase letter, digit, special character (6 min)")

const register = Joi
  .object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
  })

const login = Joi
  .object({
    email: email.required(),
    password: password.required(),
  })

const subscription = Joi
  .object({
    subscription: Joi.string().valid("starter", "business", "pro"),
  })

module.exports = {
  register,
  login,
  subscription,
}