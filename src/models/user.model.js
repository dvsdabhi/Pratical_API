const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "customer"
    }
});

const User = mongoose.model("users",userSchema); 
module.exports = User;