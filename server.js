//import module
const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

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
    const client = new Client({
        user: "hdinjos",
        host: "127.0.0.1",
        database: "medical1",
        password: "qwerty123",
        port: 5432,
    });

    client
        .connect()
        .then(() => {
            return client.query("SELECT * FROM meds");
        })
        .then((result) => {
            console.log("result?", result);
            res.render("meds", result);
        });
});

app.get("/add", (req, res) => {
    res.render("med-form");
});

app.post("/meds/add", (req, res) => {
    // console.log("post ", req.body);
    const client = new Client({
        user: "hdinjos",
        host: "127.0.0.1",
        database: "medical1",
        password: "qwerty123",
        port: 5432,
    });

    client
        .connect()
        .then(() => {
            console.log("connection complete");
            const sql = "INSERT INTO meds (name, count, brand) VALUES ($1, $2, $3)";
            const params = [req.body.name, req.body.count, req.body.brand];
            return client.query(sql, params);
        })
        .then((result) => {
            console.log("result?", result);
            res.redirect("/meds");
        });
});

app.post("/meds/delete/:id", (req, res) => {
    const client = new Client({
        user: "hdinjos",
        host: "127.0.0.1",
        database: "medical1",
        password: "qwerty123",
        port: 5432,
    });

    client
        .connect()
        .then(() => {
            const sql = "DELETE from meds WHERE mid=$1";
            const params = [req.params.id];
            return client.query(sql, params);
        })
        .then((result) => {
            res.redirect("/meds")
        });
});

//app listen
app.listen(5000, () => {
    console.log("server listen port 5000");
});