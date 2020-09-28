var User = require("../app/models/user");

var signupStrategy = new(require("passport-local").Strategy)({
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    async function(req, email, password, done) {
        // asynchronous
        //  Whether we're signing up or connecting an account, we'll need
        //  to know if the email address is in use.
        User.findOne({ "local.email": email }, function(err, existingUser) {
            // if there are any errors, return the error
            if (err) {
                return done(err);
            }
            // check to see if there's already a user with that email
            if (existingUser) {
                return done(
                    null,
                    false,
                    req.flash("AuthMessage", "That email is already taken.")
                );
            }
            //  We're not logged in, so we're creating a brand new user.
            else {
                // create the user
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = password;
                newUser.local.passwordConfirm = req.body.passwordConfirm;
                newUser.local.name = req.body.name;
                if (password !== req.body.passwordConfirm)
                    return done(
                        null,
                        false,
                        req.flash("AuthMessage", "Passwords Don't Match")
                    );

                newUser.save(async function(err) {
                    if (err) {
                        console.log(err);
                        if (err.message.startsWith("User validation failed"))
                            var message = err.message.split(":")[2];
                        else var message = err.message;
                        return done(null, false, req.flash("AuthMessage", message));
                    }
                    return done(null, newUser);
                });
            }
        });
    }
);

module.exports = signupStrategy;