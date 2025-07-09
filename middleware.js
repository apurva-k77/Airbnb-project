const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.path, "..", req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; // store the original URL to redirect after login so that user goes to the same page he requested for before login
        req.flash("error", "You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}; 

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

//the function of this middleware is to check if the current user is the owner of the listing 
// middlewares contains taht code which is repeated in many routes, so we put it in a middleware to avoid repetition and directly call it in the routes as we call a function
module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);   
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
   
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,  errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
   
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,  errMsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);   
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};