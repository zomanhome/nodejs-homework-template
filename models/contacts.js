const Contact = require("../models/contact")

const listContacts = async ({owner, skip, limit, favorite}) =>
  favorite
    ? Contact.find({owner, favorite}).skip(skip).limit(limit).sort({createdAt: -1})
    : Contact.find({owner}).skip(skip).limit(limit).sort({createdAt: -1})

const countContacts = async ({owner, favorite}) =>
  favorite
    ? Contact.count({owner, favorite})
    : Contact.count({owner})

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
