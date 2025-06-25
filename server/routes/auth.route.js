const {
  Login,
  Signup,
  authenticateToken
} = require('../controller/auth.controller')

const router = require('express').Router()

router.post('/login', Login)

router.post('/signup', Signup)

router.get('/validate-token', authenticateToken)

module.exports = router
