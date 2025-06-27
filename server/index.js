const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

//Routes
const webhookRoutes = require('./routes/webhook')
const authRoutes = require('./routes/auth.route')

//Tables
const createUserTable = require('./db/userTable')
createUserTable()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/webhook', webhookRoutes)
app.use('/', authRoutes)

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.get('/', (req, res) => {
  res.send('AI Code Assistant Backend Running')
})

app.listen(3000, () => {
  console.log('Server is running at 3000')
})
