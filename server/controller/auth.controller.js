const { createToken, encrypt, decrypt } = require('../utils/token')
const bcrypt = require('bcrypt')
const connection = require('../db/pool')
const e = require('express')
const jwt = require('jsonwebtoken')

const Login = (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    connection.query(
      'SELECT * FROM gitlab_user WHERE email = ?',
      [email],
      async (err, result) => {
        if (err) throw err

        const user = result[0]
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password.' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid email or password.' })
        }

        const token = createToken(user.id)

        return res.status(200).json({
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            avatar_url: user.avatar_url,
            gitlab_username: user.gitlab_username,
            gitlab_profile_url: user.gitlab_profile_url
          },
          token
        })
      }
    )
  } catch (err) {
    return res.status(500).json({ error: 'Server Error' })
  }
}

const Signup = (req, res) => {
  try {
    const {
      username,
      email,
      password,
      personal_access_token,
      avatar_url,
      gitlab_username,
      gitlab_profile_url
    } = req.body

    connection.query(
      'search * from gitlab_user where email=?',
      [email],
      async (err, result) => {
        if (err) throw err

        if (result[0]) {
          return res.status(409).json({ error: 'User already exists!' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const encryptedToken = encrypt(personal_access_token)

        connection.query(
          'insert into gitlab_user (username,email,password,avatar_url,gitlab_username,gitlab_profile_url,personal_access_token) values (?,?,?,?,?,?,?)',
          [
            username,
            email,
            hashedPassword,
            avatar_url,
            gitlab_username,
            gitlab_profile_url,
            encryptedToken
          ],
          (err, insertResult) => {
            if (e) throw e
            const token = createToken(insertResult.insertId)
            return res.status(201).json({
              user: {
                id: insertResult.insertId,
                email,
                gitlab_profile_url,
                gitlab_username,
                avatar_url
              },
              token
            })
          }
        )
      }
    )
  } catch (err) {
    return res.status(500).json({ error: 'Server Error' })
  }
}
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' })

    res.status(200).json({ message: 'User Validation Successful!' })
  })
}

module.exports = { Login, Signup, authenticateToken }
