module.exports = function(app) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("500.ejs", {
            message: err.message,
            error: {},
        });
    });

    //If Invalid Routes, send a 404 HTML
    app.get("*", function(req, res) {
        res.render("404.ejs");
    });
};