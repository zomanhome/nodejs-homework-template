const express = require('express')

const validateSchema = require('../../controllers/validate-schema')
const contact = require('../../schemas/contact')
const {get, getById, add, remove, put} = require("../../controllers/contacts");

const router = express.Router()

router.get('/', get)

router.get('/:contactId', getById)

router.post('/', validateSchema(contact.post), add)

router.delete('/:contactId', remove)

router.put('/:contactId', validateSchema(contact.put), put)

router.patch('/:contactId/favorite',validateSchema(contact.patch), put)

module.exports = router
