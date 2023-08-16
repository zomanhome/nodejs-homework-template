const {mongoose} = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise

const mongoCloud = async () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }

  try {
    await mongoose.connect(process.env.DB_HOST)

    return {
      success: true,
    }
  } catch (e) {
    console.log(`Database connection failed: ${e.message}`)
    process.exit(1)
  }
}

module.exports = mongoCloud
