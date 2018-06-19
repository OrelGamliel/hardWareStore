var Tool = require("../models/tool");
var Comment = require("../models/comment");
var middlewareObj = {};



middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
               if(err){
                    res.flash("error", "Something went wrong");
                    res.redirect("back");
               } else {
                   if(foundComment.author.id.equals(req.user._id)){
                       next();
                   } else {
                       res.redirect("back");
                   }
               }   
            }); 
       } else {
           res.redirect("back");
       }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};


module.exports = middlewareObj;