const express = require('express')
const mongoose = require('mongoose')

const moviesRoutes = require('./routes/movies')

const PORT = 3000
const URL = 'mongodb://localhost:27017/moviebox'

const app = express()
app.use(express.json())

mongoose.connect(URL).then(() => {
  console.log('Connected to MongoDb')
}).catch((err) => {
  console.log(`DB connection error: ${err}`)
})

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`)
})

app.use('/movies', moviesRoutes)
