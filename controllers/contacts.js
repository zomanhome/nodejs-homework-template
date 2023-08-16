const {listContacts, getContactById, addContact, removeContact, updateContact} = require('../models/contacts');

const errorWrapper = ctrl => async (req, res, next) => {
  try {
    await ctrl(req, res, next)
  } catch (e) {
    next(e)
  }
}

const get = async (req, res) => {
  const data = await listContacts()

  res.status(200).json({
    success: true,
    code: 200,
    message: null,
    data,
  })
}

const getById = async (req, res, next) => {
  const {contactId} = req.params
  const data = await getContactById(contactId)

  !data.length
    ? next({
      success: false,
      code: 500,
      message: 'Contact not found',
      data,
    })
    : res.status(200).json({
      success: true,
      code: 200,
      message: null,
      data,
    })
}

const add = async (req, res) => {
  const data = await addContact(req.body)

  res.status(201).json({
    success: true,
    code: 201,
    message: 'Contact added',
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