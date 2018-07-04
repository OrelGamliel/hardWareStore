var express = require("express");
var router = express.Router({mergeParams: true});
var Tool  = require("../models/tool");
var Comment  = require("../models/comment");
var middleware = require("../middleware");

//Comments new
router.get("/new",middleware.isLoggedIn, function(req, res){
    Tool.findById(req.params.tool_id, function(err, foundTool){
        if(err){
            req.flash("error", "Something went wrong");
            console.log(err);
        } else {
            res.render("comments/new", {category_id:req.params.id,tool:foundTool});
        }    
    });
});

   

//Comments create
router.post("/",middleware.isLoggedIn, function(req, res){
    Tool.findById(req.params.tool_id, function(err, tool){
        if(err){
            req.flash("error", "Something went wrong");
            console.log(err);
        } else {
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else {
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  tool.comments.push(comment._id);
                  tool.save();
                  res.redirect("/catalog/"  + req.params.id + "/" + req.params.tool_id);
              }   
          });   
        }    
    });
});
//Comments edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error", "Something went wrong");
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {category_id:req.params.id,tool_id:req.params.tool_id, comment:foundComment});
                }
        });   
    });
//Comments update
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
       Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
            if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
           } else {
            res.redirect("/catalog/"  + req.params.id + "/" + req.params.tool_id);   
           }
       });
    });
//Comments destroy 
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
       Comment.findByIdAndRemove(req.params.comment_id, function(err){
            if(err){
            res.redirect("back");
           } else { 
            res.redirect("/catalog/"  + req.params.id + "/" + req.params.tool_id);   
           }
       });
    });    

module.exports = router;