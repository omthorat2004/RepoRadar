const { createToken } = require('../utils/token')
const connection = require('../db/pool')

const Login = (req, res) => {}

const Signup = (req, res) => {
  try {
    const { username, email, password, personal_access_token } = req.body

    connection.query(
      'search * from gitlab_user where email=?',
      [email],
      (err, result) => {
        if (err) throw err

        if (result[0]) {
          return res.status(409).json({ error: 'User already exists!' })
        }
      }
    )
  } catch (err) {
    return res.status(500).json({ error: 'Server Error' })
  }
}
