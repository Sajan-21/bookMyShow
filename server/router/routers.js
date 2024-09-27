const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controller/moviesController');

router.post('/movie',controller.addMovie);
router.get('/movies',controller.getAllMovies);
router.get('/movie/:id',controller.getMovie);
router.put('/movie/:id',controller.updateMovie);
router.delete('/movie/:id',controller.deleteMovie);
router.get('/categorized',controller.categorizedMovies);
router.get('/categories',controller.getCategories);
router.get('/languages',controller.getLanguages);

module.exports = router;