const Contact = require('../models/mongo')

const listContacts = async () =>
  Contact.find()

const getContactById = async (contactId) =>
  Contact.find({_id: contactId})

const removeContact = async (contactId) =>
  Contact.findByIdAndRemove({_id: contactId})

const addContact = async (body) =>
  Contact.create(body)

const updateContact = async (contactId, body) =>
  Contact.findByIdAndUpdate({_id: contactId}, body, {new: true})


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
