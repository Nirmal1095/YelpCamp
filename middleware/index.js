// All the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
      //is user loggen in??
            Campground.findById(req.params.id, function(err,foundCampground){
                if(err){
                  req.flash("error","Campground not Found");
                  res.redirect("back");
                  } else {
                      //does user own the campground??
                        if(foundCampground.author.id.equals(req.user._id)) {
                          next();
                        } else {
                          req.flash("error","You don't have permission to do that!!!");
                          res.redirect("back");
                        }
                      }
                    });
                } else {
                  req.flash("error","You need to be Logged in to do that!!!");
                  res.redirect("back");
              }
            }

      middlewareObj.isLoggedIn = function(req ,res , next){
            if(req.isAuthenticated()){
                return next();
                  }
                  req.flash("error","You need to be Logged in to do that!!!");
                  res.redirect("/login");
                }


    middlewareObj.checkCommentOwnership = function(req,res,next){
      if(req.isAuthenticated()){
        //is user loggen in??
              Comment.findById(req.params.comment_id, function(err,foundComment){
                if(err){
                  res.redirect("back");
                } else {
                  //does user own the comment??
                  if(foundComment.author.id.equals(req.user._id)) {
                    next();
                  } else {
                    req.flash("error","You don't have persmission to do that!!!");
                    res.redirect("back");
                    }
                }
              });
              } else {
                req.flash("error","You need to be Logged in to do that!!!");
              res.redirect("back");
            }
    }
            module.exports = middlewareObj;
