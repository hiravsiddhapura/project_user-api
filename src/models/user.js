const mongoose = require('mongoose');
const { trim, stripLow } = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true,
        trim : true
    },

    dob : {
        type: Date,
        required : true,
        trim : true 
    }
})

//Create a new Collection
const UsersDetail = new mongoose.model("UserDetail", userSchema)

module.exports = UsersDetail;