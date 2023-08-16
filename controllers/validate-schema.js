const validateSchema = schema => async (req, res, next) => {
  const {error} = schema.validate(req.body);
  const message = error?.details.map(e => e.message).join(', ')

  error
    ? res.status(400).json({
      success: false,
      code: 400,
      message,
      data: null,
    })
    : next()
}

module.exports = validateSchema