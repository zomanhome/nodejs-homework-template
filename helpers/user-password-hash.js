const bcrypt = require("bcryptjs")

const createHashedPassword = async (password) => await bcrypt.hash(password, 10)

const comparePasswords = async (password, hash) => await bcrypt.compare(password, hash)


module.exports = {
  createHashedPassword,
  comparePasswords,
}