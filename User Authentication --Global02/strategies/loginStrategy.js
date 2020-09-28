var User = require("../app/models/user");
var loginStrategy = new(require("passport-local").Strategy)({
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        // asynchronous
        process.nextTick(function() {
            User.findOne({ "local.email": email, "local.active": { $ne: false } },
                function(err, user) {
                    // if there are any errors, return the error
                    if (err) return done(err);

                    // if no user is found, return the message
                    if (!user || !user.validPassword(password))
                        return done(
                            null,
                            false,
                            req.flash("AuthMessage", "Invalid Username or Password")
                        );
                    // all is well, return user
                    else return done(null, user);
                }
            );
        });
    }
);

module.exports = loginStrategy;