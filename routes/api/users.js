const express = require("express")
const auth = require("../../middlewares/auth")
const upload = require("../../middlewares/multer")
const {updateUserAvatar} = require("../../controllers/auth")

const router = express.Router()

router.patch("/avatars", auth, upload.single("avatar"), updateUserAvatar)

module.exports = router
