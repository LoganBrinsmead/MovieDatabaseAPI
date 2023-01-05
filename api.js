const koa = require('koa');             // include Koa
const koaJSON = require('koa-json');    // include koa-json, koa-bodyparser, and the default router which contains all route paths
const koaBodyParser = require('koa-bodyparser');
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require('koa-cors');
const session = require('koa-session');
const passport = require('koa-passport');
const RedisStore = require('koa-redis');

const defaultRouter = require('./router/default.js'); 
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })          // environment variables
const api = new koa();                  // set api to be koa object

const API_PORT = process.env.API_PORT || 1337;                  // define api port to listen on

api.use(Logger());
api.use(cors());


// inject middleware
api.use(async (ctx, next) => {
    await next();
    const responseTime = ctx.response.get('X-Response-Time');
    console.log(`Type: ${ctx.method} Status: ${ctx.status} Path: ${ctx.url} RT: ${responseTime}ms`);
});

// inject middleware again
api.use(async (ctx, next) => {
    const startTime = Date.now();
    await next();
    const responseTime = Date.now() - startTime;
    ctx.set('X-Response-Time', responseTime);
});


// final injection of middleware, log any errors that may come up from api calls
api.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.log(`Path: ${ctx.url} Status: ${ctx.status} Error: ${e.sqlMessage ?? 'Unknown error!'}`);
    }
});

// sessions
api.keys = [process.env.SESSION_KEY] ?? ['super-secret-key'];
api.use(session(api));

// auth
require('./auth');
api.use(passport.initialize());
api.use(passport.session());

api.use(session({
    store: new RedisStore()
}, api));

// api.use(function * setUserInContext (next) {
//     this.user = this.req.user
//     yield next
// })

api.use(koaJSON());                 // inject koaJSON middleware
api.use(koaBodyParser());           // inject koa-body-parser middleware

// default router uses koa object
defaultRouter(api);

console.log(`\nNow listening on port: ${API_PORT}`)

// listen for calls to the port
api.listen(API_PORT);
