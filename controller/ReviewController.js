const db = require('../database/connection');

class ReviewController {

    // query the view that shows movies that have reviews
    static showMoviesThatHaveReviews(ctx) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM vw_MoviesWithReviews;";
            db.query(query, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            });
        });
    } 

    // find reviews for a movie using the movie's title
    static showReviewsForMovie(ctx) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Review WHERE title = ?;";
            db.query({
                sql: query,
                values: [ctx.params.title]
            }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            })
        });
    }

    // add a review to the review table
    static postReview(ctx) {
        return new Promise((resolve, reject) => {
            const review = ctx.request.body;
            const query = `
            INSERT INTO Review
            (uID, title, director_name, \`date\`, stars, \`text\`)
            VALUES (?, ?, ?, ?, ?, ?);`;            
            db.query(
                {
                    sql: query,
                    values: [review.uID, review.title, review.director_name, review.date, review.stars, review.text]
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

    // update the text of a review by its uID
    static updateReviewText(ctx) {
        return new Promise((resolve, reject) => {
            const textAndID = ctx.request.body;
            const query = `
            UPDATE Review
            SET text = ?
            WHERE uID = ?;`;
            db.query({
                sql: query,
                values: [textAndID.text, textAndID.uID]
            }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown Error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve(res);
            })
        });
    }    

    // delete a review according to its user ID and the title of the movie 
    // that it is written for
    static deleteReviewByIDAndTitle(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Review
                WHERE uID = ? AND title = ?;`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.uID, ctx.params.title]
                }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 204;
                resolve();
            });
        });
    }


}

module.exports = ReviewController;