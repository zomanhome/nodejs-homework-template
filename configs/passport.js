const passport = require("passport")
const passportJWT = require("passport-jwt")
const {findUserById} = require("../models/users")
const HttpError = require("../helpers/HttpError")
require("dotenv").config()

const secret = process.env.SECRET_KEY

const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, function (payload, done) {
    findUserById(payload.id)
      .then((user) => {
        if (!user) {
          return done(HttpError(404))
        }
        return done(null, user)
      })
      .catch(err => done(err))
  }),
)

module.exports = passport
