const express = require('express')
const app = express()
const colors = require('colors')
const dotenv = require('dotenv')
const mongoDB = require('./config/mongodb')

// Init Middleware
app.use(express.json({ extended: false }))

dotenv.config({ path: './config/config.env' })

// Connect DB
// mongoDB()

app.get('/', (req, res) => res.send('API Running.'.green))

// Routes Define

const PORT = process.env.POST || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}.`.blue.bold))
