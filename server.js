//import module
const express = require("express");
const mustacheExpress = require("mustache-express");

//use module
const app = express();
const mustache = mustacheExpress();

//setting up template engine
mustache.cache = null;
app.engine("mustache", mustache);
app.set("view engine", "mustache");

//setting up storage
app.use(express.static("public"));

//setting simple routing
app.get("/meds", (req, res) => {
    res.render("meds");
});

//app listen
app.listen(5000, () => {
    console.log("server listen port 5000");
});