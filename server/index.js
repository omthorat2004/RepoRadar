const express = require('express')
const cors = require('cors')

const app = express()

//Routes
const webhookRoutes = require('./routes/webhook')

//Tables
const createUserTable = require('./db/userTable')

app.use(cors())
app.use(express.json())
app.use('/webhook', webhookRoutes)

app.get('/', (req, res) => {
  res.send('AI Code Assistant Backend Running')
})

app.listen(3000, () => {
  console.log('Server is running at 3000')
})
