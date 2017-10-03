var express = require("express");
var app = express();
//permite parsear JSON
var bodyParser = require("body-parser");
//nos permite implementar y personalizar métodos HTTP.
var methodOverride = require("method-override");
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);
app.use(methodOverride());

var router = express.Router();

router.get('/', function (req, res) {
    res.send("Hello world!");
});

app.use(router);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});