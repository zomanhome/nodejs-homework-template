const errorWrapper = ctrl => async (req, res, next) => {
  try {
    await ctrl(req, res, next)
  } catch (e) {
    next(e)
  }
}

module.exports = errorWrapper