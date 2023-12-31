require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async() => {
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("database connect successfully");
    }).catch(()=>{
        console.log(error);
        
    })
}

module.exports =  connectDB;