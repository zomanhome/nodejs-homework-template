const errorWrapper = require("../helpers/error-wrapper")
const {
  createUser,
  findUserByEmail,
  findUserById,
  updateSubscriptionById,
  updateTokenById,
  updateAvatarById,
} = require("../models/users")
const {comparePasswords} = require("../helpers/user-password-hash")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const HttpError = require("../helpers/HttpError")
const uploadFile = require("../db/cloudinary")
const fs = require("fs/promises")
const gravatar = require("gravatar")
const Jimp = require("jimp")

const register = async (req, res) => {
  const user = await findUserByEmail(req.body.email)

  if (user) {
    throw HttpError(409)
  }

  const avatarURL = await gravatar.url(req.body.email)
  const {email} = await createUser({...req.body, avatarURL})

  res.status(201).json({
    success: true,
    code: 201,
    message: "User registered successfully",
    data: email,
  })
}

const login = async (req, res) => {
  const user = await findUserByEmail(req.body.email)
  const error = HttpError(401, "Email or password incorrect")

  if (!user) throw error

  const {password, id} = user
  const isEqual = await comparePasswords(req.body.password, password)

  if (!isEqual) throw error

  const {SECRET_KEY} = process.env
  const payload = {id}
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})

  await updateTokenById(id, token)

  res.status(200).json({
    success: true,
    code: 200,
    message: "User logged in successfully",
    data: {token},
  })
}

const logout = async (req, res) => {
  const {id} = req.user
  await updateTokenById(id, "")

  res.status(204).end()
}

const current = async (req, res) => {
  const {name, email, subscription, _id: userId, avatarURL} = req.user

  await findUserById(userId)

  res.status(200).json({
    success: true,
    code: 200,
    message: "Current user",
    data: {name, email, subscription, avatarURL, id: userId},
  })
}

const updateSubscription = async (req, res) => {
  const {userId} = req.params
  const {subscription} = req.body

  await updateSubscriptionById(userId, subscription)

  res.status(200).json({
    success: true,
    code: 200,
    message: "Subscription updated",
  })
}

const updateUserAvatar = async (req, res) => {
  const {path} = req.file

  const avatar = await Jimp.read(path)
  await avatar.resize(128, 128).write(path)

  const result = await uploadFile(path)
  await updateAvatarById(req.body.id, result.url)

  res.status(200).json({
    success: true,
    code: 200,
    message: "Avatar updated",
    data: {avatarURL: result.url},
  })

  await fs.unlink(path)
}

module.exports = {
  register: errorWrapper(register),
  login: errorWrapper(login),
  logout: errorWrapper(logout),
  current: errorWrapper(current),
  updateSubscription: errorWrapper(updateSubscription),
  updateUserAvatar: errorWrapper(updateUserAvatar),
}