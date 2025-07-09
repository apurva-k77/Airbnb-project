const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings, query: ""});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path :"reviews", populate: {path: "author",},} ).populate("owner"); //populate is used to get the details of the owner of the listing
    console.log("Listing data:", listing.geometry);

    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
    .send();
        
    let url = req.file.path;
    let filename = req.file.filename;  
    const newListing = new Listing(req.body.listing);   //converting the body to listing object by changing the name of the input fields in the form to listing[title], listing[description] etc.
    newListing.owner = req.user._id; //setting the owner of the listing to the current user
    newListing.image = {url, filename};
    
    newListing.geometry = response.body.features[0].geometry;
    
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }   

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250") 
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;  
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", " Listing Deleted!");
    res.redirect("/listings");
};

module.exports.searchListings = async (req, res) => {
    const query = req.query.q;
    let listings = [];

    if (query) {
        listings = await Listing.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } },
                { country: { $regex: query, $options: "i" } }
            ]
        });
    } else {
        listings = await Listing.find({});
    }

    res.render("listings/index", { allListings: listings, query });
};
