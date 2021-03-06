var authController = require("../controllers/authController");

module.exports = function(app, passport) {
    // normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get("/", function(req, res) {
        res.render("index.ejs");
    });

    // PROFILE SECTION =========================
    app.get("/profile", isLoggedIn, function(req, res) {
        res.render("profile.ejs", {
            user: req.user,
        });
    });

    // LOGOUT ==============================
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------

    app.get("/signup", function(req, res) {
        res.render("signup.ejs", {
            message: req.flash("AuthMessage"),
        });
    });

    app.get("/login", function(req, res) {
        res.render("authenticate.ejs", {
            message: req.flash("AuthMessage"),
        });
    });

    // LOGIN ===============================
    // process the login form
    app.post(
        "/login",
        passport.authenticate("local-login", {
            successRedirect: "/profile", // redirect to the secure profile section
            failureRedirect: "/signup", // redirect back to the signup page if there is an error
            failureFlash: true, // allow flash messages
        })
    );

    // SIGNUP ================================
    // process the signup form
    app.post(
        "/signup",
        passport.authenticate("local-signup", {
            successRedirect: "/profile",
            failureRedirect: "/signup", // redirect back to the signup page if there is an error
            failureFlash: true, // allow flash messages
        })
    );

    // FORGOT PASSWORD
    app.get("/forgotPassword", function(req, res) {
        res.render("forgot.ejs", { message: req.flash("forgotMessage") });
    });
    app.post("/forgotPassword", authController.forgotPassword);

    // RESET PASSWORD
    app.get("/resetPassword/:token", function(req, res) {
        console.log(req.params.token);
        res.render("reset.ejs", {
            message: req.flash("ResetMessage"),
            token: req.params.token,
        });
    });

    app.post("/resetPassword/:token", authController.resetPassword);

    app.get("/deactivate", function(req, res) {
        res.render("deactivate.ejs", {
            message: req.flash("delMessage"),
        });
    });
    app.post("/deactivate", authController.deleteAccount);

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get(
        "/auth/facebook",
        passport.authenticate("facebook", { scope: "email" })
    );

    // handle the callback after facebook has authenticated the user
    app.get(
        "/auth/facebook/callback",
        passport.authenticate("facebook", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get(
        "/auth/twitter",
        passport.authenticate("twitter", { scope: "email" })
    );

    // handle the callback after twitter has authenticated the user
    app.get(
        "/auth/twitter/callback",
        passport.authenticate("twitter", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    // google ---------------------------------

    // send to google to do the authentication
    app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    // the callback after google has authenticated the user
    app.get(
        "/auth/google/callback",
        passport.authenticate("google", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get(
        "/connect/facebook",
        passport.authorize("facebook", { scope: "email" })
    );

    // handle the callback after facebook has authorized the user
    app.get(
        "/connect/facebook/callback",
        passport.authorize("facebook", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get(
        "/connect/twitter",
        passport.authorize("twitter", { scope: "email" })
    );

    // handle the callback after twitter has authorized the user
    app.get(
        "/connect/twitter/callback",
        passport.authorize("twitter", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    // google ---------------------------------

    // send to google to do the authentication
    app.get(
        "/connect/google",
        passport.authorize("google", { scope: ["profile", "email"] })
    );

    // the callback after google has authorized the user
    app.get(
        "/connect/google/callback",
        passport.authorize("google", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get("/unlink/local", authController.deleteAccount);

    // facebook -------------------------------
    app.get("/unlink/facebook", function(req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect("/profile");
        });
    });

    // twitter --------------------------------
    app.get("/unlink/twitter", function(req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect("/profile");
        });
    });

    // google ---------------------------------
    app.get("/unlink/google", function(req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect("/profile");
        });
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/");
}