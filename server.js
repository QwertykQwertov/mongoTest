const express = require('express')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

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

let db

function handleError(res, error) {
  res.status(500)
  res.json({ error })
}

app.get('/movies', (req, res) => {
  const movies = []
  db.collection('movies')
    .find()
    .sort({ name: 1 }).forEach(movie => {
      movies.push(movie)
    }).then(() => {
      res.status(200)
      res.json(movies)
    }).catch(() => handleError(res, 'Something goes wrong...'))
})

app.get('/movies/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('movies')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((document) => {
        res.status(200)
        res.json(document)
      }).catch(() => handleError(res, 'Something goes wrong...'))
  } else {
    handleError(res, 'Wrong id')
  }
})

app.delete('/movies/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('movies')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((document) => {
        res.status(200)
        res.json(document)
      }).catch(err => handleError(res, 'Something goes wrong...'))
  } else {
    handleError(res, 'Wrong id')
  }
})

app.post('/movies', (req, res) => {
  db.collection('movies')
    .insertOne(req.body)
    .then((document) => {
      res.status(201)
      res.json(document)
    }).catch(err => handleError(res, 'Something goes wrong...'))
})

app.patch('/movies/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('movies')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
      .then((document) => {
        res.status(201)
        res.json(document)
      }).catch(err => handleError(res, 'Something goes wrong...'))
  } else {
    handleError(res, 'Wrong id')
  }
})