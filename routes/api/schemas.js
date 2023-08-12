const Joi = require('joi')

const name = Joi.string().pattern(/^(.*\s.*)[a-zA-Z]+$/).message('require: Name Surname')
const email = Joi.string().email({minDomainSegments: 2}).message('require: name@domen.domen')
const phone = Joi.string().pattern(/^[0-9]{10,15}/).message('require: 10-15 digits')

const schemaPost = Joi
  .object({
    name: name.required(),
    email: email.required(),
    phone: phone.required(),
  })

const schemaPut = Joi
  .object({
    name,
    email,
    phone,
  })
  .or('name', 'email', 'phone')

module.exports = {
  schemaPost,
  schemaPut,
}
