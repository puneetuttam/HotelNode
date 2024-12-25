const mongoose = require("mongoose");
require('dotenv').config();

const mongooseURL =process.env.DB_URL;

mongoose.connect(mongooseURL);
const db = mongoose.connection;
db.on("connected", () => {
    console.log("Server is connected to DB");
});
db.on("disconnected", () => {
    console.log("Server is disconnected to DB");
});
db.on("error", () => {
    console.log("Error in connecting db");
});

module.exports = db;
