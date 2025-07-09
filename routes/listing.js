const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
const { searchListings } = require("../controllers/listings");

router.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn, upload.single('listing[image]'), validateListing,  wrapAsync (listingController.createListing));


// CREATE OPERATION - NEW ROUTE & CREATE ROUTE (includes both routes)
// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Search
router.get("/search", searchListings);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing,  wrapAsync( listingController.updateListing))
.delete( isLoggedIn, isOwner,  wrapAsync( listingController.destroyListing));


//UPDATE OPERATION - EDIT ROUTE & UPDATE ROUTE (includes both routes)
//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm));



module.exports = router;

