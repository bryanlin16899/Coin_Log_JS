const express = require('express')
const app = express()
const colors = require('colors')

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running.'.green))

// Routes Define

const PORT = process.env.POST || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}.`.blue.bold))
