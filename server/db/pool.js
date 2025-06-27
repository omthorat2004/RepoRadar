const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 11890
})

connection.connect(err => {
  if (err) {
    console.error('Connection error:', err)
    // Handle error appropriately
    return
  }
  console.log('Connected to MySQL')
})

module.exports = connection
