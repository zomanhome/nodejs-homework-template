const User = require("../models/user")
const {createHashedPassword} = require("../helpers/user-password-hash")

const createUser = async (body) =>
  User.create({...body, password: await createHashedPassword(body.password)})

const findUserByEmail = async (email) =>
  User.findOne({email})

const findUserById = async (id) =>
  User.findOne({_id: id})

const updateSubscriptionById = async (id, subscription) =>
  User.findByIdAndUpdate({_id: id}, {subscription})

const updateTokenById = async (id, token) =>
  User.findByIdAndUpdate({_id: id}, {token})

const updateAvatarById = async (id, avatarURL) =>
  User.findByIdAndUpdate({_id: id}, {avatarURL})

const findByVerificationToken = async (verificationToken) =>
  User.findOne({verificationToken})

const updateVerificationSuccess = async (id) =>
  User.findByIdAndUpdate({_id: id}, {verificationToken: null, verify: true})

const updateVerificationTokenById = async (id, verificationToken) =>
  User.findByIdAndUpdate({_id: id}, {verificationToken})

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateSubscriptionById,
  updateTokenById,
  updateAvatarById,
  findByVerificationToken,
  updateVerificationSuccess,
  updateVerificationTokenById,
}