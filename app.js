const express = require("express");
const app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/search", (req, res) => {
    res.render("search")
})

app.get("/result", (req, res) => {
    var query = req.query.search;
    var url = "http://openweathermap.org/data/2.5/weather?q=" + query + "&appid=b6907d289e10d714a6e88b30761fae22";
    request(url, (error,response, body) => {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            // console.log(data["main"]["temp"])
            res.render("result", { data: data })
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log("Server started!");
})