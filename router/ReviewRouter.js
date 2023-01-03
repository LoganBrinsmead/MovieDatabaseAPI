const ReviewController = require('../controller/ReviewController');             // import the review controller
const reviewRouter = require('koa-router')({                                    // import koa router and set prefix for router to /review
    prefix: '/review'
});

reviewRouter.get('/', ReviewController.showMoviesThatHaveReviews);              // method to show movies that have reviews with path /
reviewRouter.get('/:title', ReviewController.showReviewsForMovie);              // show reviews for a certain movie according to its title
reviewRouter.post('/', ReviewController.postReview);                            // post a review to the database
reviewRouter.put('/', ReviewController.updateReviewText);                       // update the text of a review using a JSON object passed with format {"text":"Review Text Here", "uID":<uID associated with user posting the review>}
reviewRouter.delete('/:uID/:title', ReviewController.deleteReviewByIDAndTitle); // delete a review from the database according to its uID and the title of the movie that it is written for

// export the review router
module.exports = reviewRouter;