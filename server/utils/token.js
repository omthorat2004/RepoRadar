const { sign } = require('jsonwebtoken')
const crypto = require('crypto')

require('dotenv').config()

const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

const createToken = id => {
  const token = sign({ id }, process.env.JSON_KEY, {
    expiresIn: '3d'
  })
}

const encrypt = text => {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

const decrypt = encryptedText => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  const decrypted = decipher.update(encryptedText, 'hex', 'utf-8')
  decipher += decipher.final('utf-8')
  return decrypted
}

module.exports = { createToken, encrypt, decrypt }
