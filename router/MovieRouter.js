const MovieController = require('../controller/MovieController');          // import the MovieController 
const movieRouter = require('koa-router')({                                // import koa router and set prefix for the movie router to /movie
    prefix: '/movie'
});

movieRouter.get('/', MovieController.getMovies);
movieRouter.get('/genres', MovieController.showGenres);
movieRouter.get('/directors', MovieController.showDirectors);
movieRouter.get('/genres', MovieController.showCelebrities);
movieRouter.get('/:genre', MovieController.filterMoviesByGenre);
movieRouter.get('/searchDirector/:director_name', MovieController.filterMoviesByDirectorName);
movieRouter.post('/', MovieController.addMovie);                    // add a movie to the database
movieRouter.delete('/:title', MovieController.deleteMovieByTitle)   // delete a movie from the database according to its title

// export the movieRouter
module.exports = movieRouter;