//import module
const express = require("express");
const hbsExpress = require("express-handlebars");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const path = require("path");

//use module
const app = express();

// setting up template engine
const hbs = hbsExpress.create({
    defaultLayout: "main",
    layoutDir: path.join(__dirname, "views/layouts"),
    helpers: { inc: value => value + 1 }
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");


//setting up storage
app.use(express.static("public"));

//setting up data input to json
app.use(bodyParser.urlencoded({ extended: false }));

// //setting simple routing
app.get("/", (req, res) => {
    res.render("index");
})

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
            // console.log("result?", result);
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
            // console.log("result?", result);
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


app.get("/meds/edit/:id", (req, res) => {
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
            const sql = "SELECT * FROM meds WHERE mid=$1";
            const params = [req.params.id];
            return client.query(sql, params);
        })
        .then((result) => {
            // console.log("this result: ", result)
            res.render("edit-med", result)
        })
})

app.post("/meds/update", (req, res) => {
    const client = new Client({
        user: "hdinjos",
        host: "127.0.0.1",
        database: "medical1",
        password: "qwerty123",
        port: 5432
    });

    client
        .connect()
        .then(() => {
            const sql = "UPDATE meds SET name=$2, count=$3, brand=$4 WHERE mid=$1";
            const params = [req.body.mid, req.body.name, req.body.count, req.body.brand];
            return client.query(sql, params);
        })
        .then((result) => {
            console.log("save successfull", result);
            res.redirect("/meds");
        })
});
//app listen
app.listen(5000, () => {
    console.log("server listen port 5000");
});