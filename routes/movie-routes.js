const { Router } = require('express')
const { getMovies,
  getMovie,
  addMovie,
  deleteMovie,
  updateMovie } = require('../controllers/movie-controller')

const router = Router()

router.get('/', getMovies)

router.get('/:id', getMovie)

router.delete('/:id', deleteMovie)

router.post('/', addMovie)

router.patch('/:id', updateMovie)

module.exports = router