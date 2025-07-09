const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({       
    email: {
        type: String,
        require : true
    }
});

userSchema.plugin(passportLocalMongoose);   // passport library automatically declares USERNAME, HASHING , SALTING & HASHED PASSWORD for user model here , so no need to again declare here

module.exports = mongoose.model("User", userSchema);

