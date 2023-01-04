const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const UserController = require('../controller/UserController');

const authRouter = new Router();

authRouter.get('/auth/register', async (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('views/register.html');
});

async function checkUser(ctx) {
    const response = await fetch(`http://localhost:8081/api/v1/user/${ctx.request.body.username}`);
    let json = await response.json();
    return json;
}

authRouter.post('/auth/register', async (ctx) => {
    const request = ctx.request.body;
    await UserController.addUser(ctx);
    return passport.authenticate('local', (err, user, info, status) => {
        if (checkUser(ctx)) {
            ctx.redirect('/api/v1/auth/status/');
            ctx.login(request);
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    })(ctx);
});

authRouter.get('/auth/status', async (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('views/status.html');
    } else {
        ctx.redirect('/api/v1/auth/login');
    }
});

authRouter.get('/auth/login', async (ctx) => {
    if(!ctx.isAuthenticated()) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('views/login.html');
    } else {
        ctx.redirect('/api/v1/auth/status');
    }
});

authRouter.get('/auth/logout', async (ctx) => {
    if(ctx.isAuthenticated()) {
        ctx.logout();
        ctx.redirect('/auth/login');
    } else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
});

module.exports = authRouter;