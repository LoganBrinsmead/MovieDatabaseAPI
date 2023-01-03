const db = require('../database/connection');

class MovieController {
    // get all movies in the database
    static getMovies(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Movie;';
            db.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            });
        });
    } 

    // delete a movie in the database using its title
    static deleteMovieByTitle(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Movie
                WHERE title = ?;`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.title]
                }, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 204;
                resolve();
            });
        });
    }

    // method to add a movie to the database
    static addMovie(ctx) {
        return new Promise((resolve, reject) => {
            const movie = ctx.request.body;
            const query = `
            INSERT INTO Movie
            VALUES (?, ?, ?, ?);`;            
            db.query(
                {
                    sql: query,
                    values: [movie.director_name, movie.title, movie.genre, movie.releaseDate]
                }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve();
            });
        });
    }

    // method to show all movie genres in the database, without repeats
    static showGenres(ctx) {
        return new Promise((resolve, reject) => {
            const query = `SELECT DISTINCT genre FROM Movie;`;
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            });
        });
    }

    // method that shows all movies with a specific genre
    static filterMoviesByGenre(ctx) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Movie WHERE genre = ?;";
            db.query(
                {
                    sql: query,
                    values: [ctx.params.genre]
                }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }

    static filterMoviesByDirectorName(ctx) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Movie WHERE director_name = ?;";
            db.query(
                {
                    sql: query,
                    values: [ctx.params.director_name]
                }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }

    // get all the directors that are in the database
    static showDirectors(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT director_name FROM Movie DISTINCT;';
            db.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            });
        });
    } 

    // get all the celebrities that are in the database
    static showCelebrities(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT celebrity_name FROM Movie DISTINCT;';
            db.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            });
        });
    } 

}

// export the movie controller
module.exports = MovieController;