var express                  = require("express"),
    app                      = express(),
    bodyParser               = require("body-parser"),
    passport                 = require("passport"),
    LocalStrategy            = require("passport-local"), 
    passportLocalMongoose    = require("passport-local-mongoose"),
    methodOverride           = require("method-override"),
    mongoose                 = require("mongoose"),
    flash                    = require("connect-flash"),
    Tool                       = require("./models/tool"),
    Comment                  = require("./models/comment"), 
    User                     = require("./models/user"),
    seedDB                   = require("./seeds.js");
    
//requring routes    
var commentRoutes      = require("./routes/comments"),
    toolRoutes          = require("./routes/tools"),
    indexRoutes         = require("./routes/index");
    
seedDB();    
// mongoose.connect("mongodb://localhost/hardwaretools_R_Us");
mongoose.connect("mongodb://tarkus:coolbeans1@ds131711.mlab.com:31711/hardwaretoolsrus");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret:"Bring me my bow of burning gold",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/",toolRoutes);
app.use("/catalog/:id/:tool_id/comments",commentRoutes);

app.listen(3000, function(){
    console.log("ITS ON");
});