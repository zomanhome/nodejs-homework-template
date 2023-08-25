const passport = require("../configs/passport")

const auth = (req, res, next) =>
  passport.authenticate("jwt", {session: false}, (err, user) => {
    if (!user || !user.token || err) {
      return res.status(401).json({
        success: false,
        code: 401,
        message: "Unauthorized",
      })
    }
    req.user = user
    next()
  })(req, res, next)

module.exports = auth
