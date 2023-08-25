const express = require('express')
const validateSchema = require('../../controllers/validate-schema')
const contact = require('../../schemas/contact')
const {get, getById, add, remove, put} = require("../../controllers/contacts")
const auth = require("../../middlewares/auth")

const router = express.Router()

router.get('/', auth, get)

router.get('/:contactId', auth, getById)

router.post('/', validateSchema(contact.post), auth, add)

router.delete('/:contactId', auth, remove)

router.put('/:contactId', validateSchema(contact.put), auth, put)

router.patch('/:contactId/favorite', validateSchema(contact.patch), auth, put)

module.exports = router
