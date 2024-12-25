const express = require("express");
const db = require("./db");
const personRoutes =require('./routes/personRoutes.js')
const menuRoutes =require('./routes/menuRoutes.js')
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send({ lsdkjfl: "lksdflkj" });
    console.log("Here is the root URL");
});

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);


const PORT=process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
