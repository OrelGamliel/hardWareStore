var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//landing page
router.get("/", function (req, res) {
    res.render("landing");
});

//register form
router.get("/register", function (req, res) {
    res.render("register");
});
//signup logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register", { error: err.message });
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to the store " + user.username + "!");
            res.redirect("/home");
        });
    });
});
//login form
router.get("/login", function (req, res) {
    res.render("login");
});
//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/catalog",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to the store!'
    }), function (req, res) {
    });
//logout
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/home");
});

module.exports = router;