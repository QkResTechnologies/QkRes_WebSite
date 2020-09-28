const path = require("path");

module.exports = function(app) {
    var root = path.resolve(`${__dirname}/../public`);

    app.get("/consultancy", function(req, res, next) {
        res.sendFile(`${root}/consultancy.html`, function(err) {
            next(err);
        });
    });

    app.get("/3d_printing", function(req, res, next) {
        res.sendFile(`${root}/3d_printing.html`, function(err) {
            next(err);
        });
    });

    app.get("/manufacturing", function(req, res, next) {
        res.sendFile(`${root}/manufacturing.html`, function(err) {
            next(err);
        });
    });

    app.get("/chemical", function(req, res, next) {
        res.sendFile(`${root}/chemical.html`, function(err) {
            next(err);
        });
    });

    app.get("/electrical", function(req, res, next) {
        res.sendFile(`${root}/elec.html`, function(err) {
            next(err);
        });
    });

    app.get("/mechanical", function(req, res, next) {
        res.sendFile(`${root}/mechanical.html`, function(err) {
            next(err);
        });
    });

    app.get("/bsopp", function(req, res, next) {
        res.sendFile(`${root}/bSoPP.html`, function(err) {
            next(err);
        });
    });

    app.get("/about", function(req, res, next) {
        res.sendFile(`${root}/About.html`, function(err) {
            next(err);
        });
    });

    app.get("/know", function(req, res, next) {
        res.sendFile("a.html", function(err) {
            next(err);
        });
    });
};