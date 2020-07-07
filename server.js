//import module
const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

//use module
const app = express();
const mustache = mustacheExpress();

//setting up template engine
mustache.cache = null;
app.engine("mustache", mustache);
app.set("view engine", "mustache");

//setting up storage
app.use(express.static("public"));

//setting up data input to json
app.use(bodyParser.urlencoded({ extended: false }));

//setting simple routing
app.get("/meds", (req, res) => {
    res.render("meds");
});

app.get("/add", (req, res) => {
    res.render("med-form");
});

app.post("/meds/add", (req, res) => {
    console.log("post ", req.body);
    res.redirect("/meds");
});
//app listen
app.listen(5000, () => {
    console.log("server listen port 5000");
});