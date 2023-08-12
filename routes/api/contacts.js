const express = require('express')

const middleware = require('../../middlewares/middleware')
const {listContacts, getContactById, removeContact, addContact, updateContact} = require("../../models/contacts");
const {schemaPost, schemaPut} = require('./schemas')

const router = express.Router()

router.get('/', async (req, res, next) => {
  listContacts().then(data => res.status(200).json(data))
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params

  getContactById(contactId).then(data => {
    data
      ? res.status(200).json(data)
      : res.status(404).json({message: 'Not found'})
  })
})

router.post('/', middleware(schemaPost), async (req, res, next) => {
  addContact(req.body).then(data => {
    data
      ? res.status(201).json(data)
      : res.status(500).json({message: 'Server error'})
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params

  removeContact(contactId).then(data => {
    data
      ? res.status(200).json({message: `${data.name} deleted`})
      : res.status(404).json({message: 'Not found'})
  })
})

router.put('/:contactId', middleware(schemaPut), async (req, res, next) => {
  const {contactId} = req.params

  updateContact(contactId, req.body).then(data => {
    data
      ? res.status(200).json(data)
      : res.status(404).json({message: 'Not found'})
  })
})

module.exports = router
