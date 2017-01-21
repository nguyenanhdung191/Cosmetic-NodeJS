const Model = require("../Model/Model");

class OrderController {
    constructor() {
        this.od = new Model.OrderDAL();
    }

    service(req, res) {
        switch (req.method) {
            case "GET": {
                let queries = req.query;
                if (Object.keys(queries).length === 0 && queries.constructor === Object) {
                    this.getCurrentOrder()
                        .then(json => {
                            res.json(json);
                        });
                } else if (Object.keys(queries).length === 1 && queries.hasOwnProperty("orderID")) {
                    this.getOrderByID(queries.orderID)
                        .then(json => {
                            res.json(json);
                        });
                }
                else {
                    res.status(404).send('Invalid URL');
                }
                break;
            }
            case "POST": {
                this.addOrder(req.body)
                    .then(result => {
                        if (result == 0) {
                            res.status(500).send("Failed!");
                        } else {
                            res.send("Done!");
                        }
                    });
                break;
            }
            case "DELETE": {
                this.deleteOrder(req.body)
                    .then(result => {
                        if (result == 0) {
                            res.status(500).send("Failed!");
                        } else {
                            res.send("Done!");
                        }
                    });
                break;
            }
            case "PUT": {
                this.closeOrder(req.body)
                    .then(result => {
                        if (result == 0) {
                            res.status(500).send("Failed!");
                        } else {
                            res.send("Done!");
                        }
                    });
                break;
            }
        }
    }

    getAllOrder() {
        return this.od.getAllOrder();
    }

    getCurrentOrder() {
        return this.od.getCurrentOrder();
    }

    getOrderByID(id) {
        return this.od.getOrderByID(id);
    }

    addOrder(order) {
        return this.od.addOrder(order);
    }

    deleteOrder(order) {
        return this.od.deleteOrder(order);
    }

    closeOrder(order) {
        return this.od.closeOrder(order);
    }
}

module.exports = OrderController;