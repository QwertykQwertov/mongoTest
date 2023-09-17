function handleError(res, error) {
  res.status(500)
  res.json({ error })
}

module.exports = handleError