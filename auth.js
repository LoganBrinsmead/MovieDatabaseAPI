const passport = require('koa-passport');
const UserController = require('./controller/UserController');
const LocalStrategy = require('passport-local').Strategy;

const options = {};

passport.serializeUser((user, done) => { done(null, user.username); });

passport.deserializeUser((username, done) => {
    fetch(`http://localhost:8081/api/v1/user/${username}`)
    .then(function(response) {
        return response.json();
    })
    .then((user) => { return done(null, user); })
    .catch((err) => { return done(err, null); })
});

passport.use(new LocalStrategy(options, (username, password, done) => {
    fetch(`http://localhost:8081/api/v1/user/${username}`)
    .then(function(response) {
        return response.json();
    }).then(function(response) {
        if(!response) return done(null, false);
        if(password === response[0].password) {
            return done(null, response[0]);
        } else {
            return done(null, false);
        }

    })
    .catch((err) => { return done(err); });
}));