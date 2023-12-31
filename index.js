require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DB = require("./src/config/db");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const userRouter = require("./src/router/user.route");
app.use("/api/user",userRouter);

app.listen(PORT,async()=>{
    await DB();
    console.log(`Your server is run on ${PORT}`);
});