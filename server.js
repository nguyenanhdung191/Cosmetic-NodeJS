const express = require('express');
const Controller = require("./src/Controller/Controller");
const config = require("./src/Common/Config");
const sql = require("mssql");
sql.connect(config.db, function (err) {
    if (err) {
        console.log('Connect err: ' + err);
    }
});

const app = express();
app.use(express.static(__dirname + '/web'));
const productController = new Controller.ProductController();
const productTypeController = new Controller.ProductTypeController();
const orderController = new Controller.OrderController();
const orderDetailController = new Controller.OrderDetailController();

app.all("/api/products", function (req, res) {
    productController.service(req, res);
});

app.all("/api/orders", function (req, res) {
    orderController.service(req, res);
});

app.all("/api/orderDetails", function (req, res) {
    orderDetailController.service(req, res);
});

app.all("/api/productTypes", function (req, res) {
    productTypeController.service(req, res);
});

app.all("/", function (req, res) {
    res.send(__dirname + "/web/index.html");
});

app.all('/*', function (req, res) {
    res.send("invalid URL");
});


const server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server started at http://%s:%s", host, port)
});



