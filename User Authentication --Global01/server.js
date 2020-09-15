// server.js

// set up ======================================================================
// get all the tools we need

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// configuration ===============================================================
const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection to Database Successful");
    });

const port = process.env.PORT || 8080;

// Get the app ================================================================

const app = require("./app");

// launch ======================================================================
const server = app.listen(port, () => {
    console.log("Listening at port: " + port);
});