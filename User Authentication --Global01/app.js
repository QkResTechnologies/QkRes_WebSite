const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

module.exports = app;