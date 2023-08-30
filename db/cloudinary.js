const {v2} = require("cloudinary")
require("dotenv").config()

v2.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
})

const uploadFile = async url => await v2.uploader.upload(url)

module.exports = uploadFile