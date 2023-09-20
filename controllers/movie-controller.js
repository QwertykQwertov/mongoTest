const Movie = require('../models/movie')
const handleError = require('../utils/handleError')

const getMovies = (req, res) => {
  Movie
    .find()
    .sort({ name: 1 }).then((movies) => {
      res.status(200)
      res.json(movies)
    }).catch((err) => handleError(res, err))
}

const getMovie = (req, res) => {
  Movie.findById(req.params.id).then((movie) => {
    res.status(200)
    res.json(movie)
  }).catch((err) => handleError(res, err))
}

const deleteMovie = (req, res) => {
  Movie.findByIdAndDelete(req.params.id).then((document) => {
    res.status(200)
    res.json(document)
  }).catch(err => handleError(res, err))
}

const addMovie = (req, res) => {
  const movie = new Movie(req.body)
  movie.save().then((result) => {
    res.status(201)
    res.json(result)
  }).catch(err => handleError(res, err))
}

const updateMovie = (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((document) => {
      res.status(201)
      res.json(document)
    }).catch(err => handleError(res, 'Something goes wrong...'))
}

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  deleteMovie,
  updateMovie
}