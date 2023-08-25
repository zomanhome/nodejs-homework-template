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

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateSubscriptionById,
  updateTokenById,
}