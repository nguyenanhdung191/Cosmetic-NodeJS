//////////////////////////////Express
const express = require('express');
//////////////////////////////Body parser
const bodyParser = require('body-parser');
//////////////////////////////Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './web/img/product/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
//////////////////////////////Import controller classes
const Controller = require("./src/Controller/Controller");
//////////////////////////////Declare config file
const config = require("./src/Common/Config");
//////////////////////////////Import and use SQL driver for NODEJS
const sql = require("mssql");
//Use one connection for entire web app
sql.connect(config.db, function (err) {
    if (err) {
        console.log('Connect err: ' + err);
    }
});
//////////////////////////////Initialize web app
const app = express();
app.use(bodyParser.json());
app.use(multer({storage: storage}).any());
app.use(express.static(__dirname + '/web'));
//Declare controllers
const productController = new Controller.ProductController();
const productTypeController = new Controller.ProductTypeController();
const orderController = new Controller.OrderController();
const orderDetailController = new Controller.OrderDetailController();
const fileUploadController = new Controller.FileUploadController();
//////////////////////////////Router
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

app.all("/api/productImage", function (req, res) {
    fileUploadController.service(req, res);
});

app.all("/", function (req, res) {
    res.send(__dirname + "/web/index.html");
});

app.all('/*', function (req, res) {
    res.send("invalid URL");
});

//////////////////////////////Start server
const server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server started at http://%s:%s", host, port)
});




