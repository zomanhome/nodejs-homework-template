const express = require("express")
const validateSchema = require("../../controllers/validate-schema")
const user = require("../../schemas/user")
const {
  register,
  login,
  logout,
  current,
  updateSubscription,
  verifyEmail,
  verify,
} = require("../../controllers/auth")
const auth = require("../../middlewares/auth")

const router = express.Router()

router.post("/register", validateSchema(user.register), register)

router.post("/login", validateSchema(user.login), login)

router.post("/logout", auth, logout)

router.get("/current", auth, current)

router.get("/verify/:verificationToken", verifyEmail)

router.post("/verify", verify)

router.patch("/subscription/:userId", auth, validateSchema(user.subscription), updateSubscription)

module.exports = router
