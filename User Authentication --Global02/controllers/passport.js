var loginStrategy = require("../strategies/loginStrategy");
var signupStrategy = require("../strategies/signupStrategy");
var facebookStrategy = require("../strategies/facebookStrategy");
var googleStrategy = require("../strategies/googleStrategy");
var twitterStrategy = require("../strategies/twitterStrategy");
// load up the user model
var User = require("../app/models/user");

module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use("local-login", loginStrategy);
    passport.use("local-signup", signupStrategy);
    passport.use("facebook", facebookStrategy);
    passport.use("twitter", twitterStrategy);
    passport.use("google", googleStrategy);
};