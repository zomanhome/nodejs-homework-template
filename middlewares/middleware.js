const middleware = schema => (req, res, next) => {
  const {error} = schema.validate(req.body);
  const message = error?.details.map(e => e.message).join(', ')

  error
    ? res.status(400).json({message})
    : next()
}

module.exports = middleware