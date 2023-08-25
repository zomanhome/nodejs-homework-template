const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  countContacts
} = require("../models/contacts")
const errorWrapper = require("../helpers/error-wrapper")
const HttpError = require("../helpers/HttpError")

const get = async (req, res) => {
  const {_id: owner} = req.user
  const {page = 1, limit = 10, favorite} = req.query

  const skip = page > 1 ? (page - 1) * limit : 0

  const totalCount = await countContacts({owner})

  const data = await listContacts(
    {owner, skip, limit, favorite}
  )

  res.status(200).json({
    success: true,
    code: 200,
    data: {...data, totalCount},
  })
}

const getById = async (req, res) => {
  const {contactId} = req.params
  const data = await getContactById(contactId)

  if (!data.length) {
    throw HttpError(404)
  }

  res.status(200).json({
    success: true,
    code: 200,
    data,
  })
}

const add = async (req, res) => {
  const {_id: owner} = req.user

  const data = await addContact({...req.body, owner})

  res.status(201).json({
    success: true,
    code: 201,
    message: "Contact added",
    data,
  })
}

const remove = async (req, res) => {
  const {contactId} = req.params
  const data = await removeContact(contactId)

  res.status(200).json({
    success: true,
    code: 200,
    message: `${data.name} deleted`,
    data,
  })
}
const put = async (req, res) => {
  const {contactId} = req.params
  const data = await updateContact(contactId, req.body)

  res.status(200).json({
    success: true,
    code: 200,
    message: `${data.name} updated`,
    data,
  })
}

module.exports = {
  get: errorWrapper(get),
  getById: errorWrapper(getById),
  add: errorWrapper(add),
  remove: errorWrapper(remove),
  put: errorWrapper(put),
}