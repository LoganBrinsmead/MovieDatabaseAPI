// include all of the routers that have been defined
const authRouter = require('./authRouter');
const movieRouter = require('./MovieRouter');
const reviewRouter = require('./ReviewRouter');
const userRouter = require('./UserRouter');

// include koa-router and default route path set to /api/v1
const defaultRouter = require('koa-router')({
    prefix: '/api/v1'
});


defaultRouter.use(
    movieRouter.routes(),
    reviewRouter.routes(),
    userRouter.routes(),
    authRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
    api.use(defaultRouter.allowedMethods());
}