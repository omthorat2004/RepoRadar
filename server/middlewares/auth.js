const checkPersonalAccessToken = async (req, res, next) => {
  try {
    const response = await fetch('https://gitlab.com/api/v4/user', {
      headers: {
        'PRIVATE-TOKEN': req.body.token
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.message || 'Invalid token' })
    }

    console.log('Valid Token:', data.username)
    next()
  } catch (err) {
    console.error('Error validating token:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { checkPersonalAccessToken }
