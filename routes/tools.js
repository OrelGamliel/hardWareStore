var express = require("express");
var router = express.Router();
var Tool  = require("../models/tool");
var middleware = require("../middleware");
var Category = require("../models/category");
var Cart = require("../models/cart")
var Order = require("../models/order")

//index route
//search logic
router.get("/home", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Tool.find({name: regex}, function(err, allTools){
           if(err){
               console.log(err);
           } else {
              if(allTools.length < 1) {
                  noMatch = "Try searching for something else or rephrasing that!";
              }
              res.render("tools/tool-search",{tools:allTools, noMatch: noMatch});
           }
        });
    } else {      
              res.render("tools/home");         
    }
});


//catalog route
router.get("/catalog", function(req, res){
        Category.find({}, function(err, categories){
        if(err){
            console.log(err);
         } else{
            res.render("tools/catalog",{categories:categories});
         }    
    });
});

//category route
router.get("/catalog/:id", function (req, res) {
        Category.findById(req.params.id, function (err, foundCategory) {
                if (err || !foundCategory) {
                    req.flash("error", "No category found.");
                    return res.redirect("back");
                }
            
                Tool.find({

                    category: foundCategory.name
                }, function (err, foundTools) {
            

                    if (err || !foundTools) {
                        req.flash("error", "No tools were found.");
                        return res.redirect("back");
                    }
            
                    res.render("tools/catalog-items", {
                        category: foundCategory,
                        tools: foundTools
                    });
                });
            });
        });



        //more info about one tool
router.get("/catalog/more/:id", function(req, res){
    Tool.findById(req.params.id).populate("comments").exec(function(err, foundTool){
        if(err){
            console.log(err);
        } else {
            res.render("tools/show", {tool:foundTool});
        }
    });
});
        
    //add to cart logic
router.get('/:id/add-to-cart',middleware.isLoggedIn, function(req, res, next) { 
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Tool.findById(req.params.id, function(err, tool) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(tool, tool.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('back');
    });
});
 //shopping cart route
router.get('/shopping-cart',middleware.isLoggedIn, function(req, res){
    if (!req.session.cart) {
        return res.render('tools/shopping-cart', {tools: null})
    } 
    var cart = new Cart(req.session.cart);
    res.render('tools/shopping-cart', {tools: cart.generateArray(), totalPrice: cart.totalPrice})
});
//reduce shopping cart item quantity logic
router.get('/reduce/:id', function(req, res, next) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(req.params.id);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});
//remove shopping cart item logic
router.get('/remove/:id', function(req, res, next) {
 
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(req.params.id);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});
//checkout form
router.get('/checkout',middleware.isLoggedIn, function(req, res){
    if (!req.session.cart) {
        return res.render('tools/shopping-cart', {tools: null})
    } 
    var cart = new Cart(req.session.cart);
    res.render('tools/checkout', {totalPrice: cart.totalPrice})
});
//checkout logic
router.post('/checkout', middleware.isLoggedIn, function(req, res) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    
    var stripe = require("stripe")(
        "sk_test_ATHrWxLyNlpHlaxLYxjIEbeo"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('back');
        });
    }); 
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;