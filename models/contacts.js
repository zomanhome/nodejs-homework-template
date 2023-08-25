const Contact = require("../models/contact")

const listContacts = async ({owner, skip, limit, favorite}) =>
  favorite
    ? Contact.find({owner, favorite}).skip(skip).limit(limit)
    : Contact.find({owner}).skip(skip).limit(limit)

const countContacts = async ({owner}) =>
  Contact.count({owner})

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
  countContacts,
}
