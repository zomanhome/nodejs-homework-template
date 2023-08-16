const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoCloud = require('./db/mongo-cloud')

mongoCloud().then(({success}) => {
  success && console.log('Database connection successful')
})

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())

app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: null,
  })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server Error'} = err
  res.status(status).json({
    success: false,
    code: status,
    message,
    data: null,
  })
})

module.exports = app
