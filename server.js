const express = require('express');
const app = express();
const Controller = require("./src/Controller/Controller");
app.use(express.static(__dirname + '/web'));

const productController = new Controller.ProductController();
const productTypeController = new Controller.ProductTypeController();

app.all("/api/products", function (req, res) {
    productController.service(req, res);
});

app.all("/api/productTypes", function (req, res) {
    productTypeController.service(req,res);
});

app.all("/", function (req, res) {
    res.send(__dirname + "/web/index.html");
});

app.all('/*', function(req, res){
    res.send("invalid URL");
});


const server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server started at http://%s:%s", host, port)
});



