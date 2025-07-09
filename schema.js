const Joi = require('joi');

//server side schema , so that user cant enter unnecessary/incomplete data from outside i.e hoppscotch.io website, so while entering data from outside website it checks with validation then only enters if all conditions satisfy
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description : Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required()
});
 
