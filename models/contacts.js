const fs = require('fs/promises')
const path = require('node:path')
const crypto = require('node:crypto')

const contactsPath = path.resolve('./', 'models/contacts.json')

const listContacts = async () => {
  const contactsString = await fs.readFile(contactsPath, {encoding: "utf-8"})

  try {
    return JSON.parse(contactsString)
  } catch (e) {
    console.error(`${e.name}: ${e.message}`)
    return []
  }
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId)

  return contact || null
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId)

  if (contact) {
    const newContacts = contacts.filter(contact => contact.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
  }

  return contact || null
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const contact = {...body, id: crypto.randomUUID()}

  contacts.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

  return contact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(contact => contact.id === contactId)

  if (~contactIndex) {
    contacts[contactIndex] = {...contacts[contactIndex], ...body}
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  }

  return contacts[contactIndex] || null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
