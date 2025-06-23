const { sign } = require('jsonwebtoken')
require('dotenv').config()
const createToken = id => {
  const token = sign({ id }, process.env.JSON_KEY, {
    expiresIn: '3d'
  })
}

module.exports = { createToken }
