const Model = require("../Model/Model");

class OrderDetailController {
    constructor() {
        this.odd = new Model.OrderDetailDAL();
    }

    service(req, res) {
        switch (req.method) {
            case "GET": {
                let queries = req.query;
                if (Object.keys(queries).length === 1 && queries.hasOwnProperty("orderID")) {
                    this.getOrderDetailByOrderID(queries.orderID)
                        .then(json => {
                            res.json(json);
                        });
                } else if (Object.keys(queries).length === 0 && queries.constructor === Object) {
                    this.getAllOrderDetail()
                        .then(json => {
                            res.json(json);
                        });
                }
                break;
            }
            case "POST": {
                this.addOrderDetail(req.body)
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
                this.updateQuantity(req.body)
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
                this.deleteOrderDetail(req.body)
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

    getOrderDetailByOrderID(orderID) {
        return this.odd.getOrderDetailByOrderID(orderID);
    }

    getAllOrderDetail() {
        return this.odd.getAllOrderDetail();
    }

    addOrderDetail(orderDetail) {
        return this.odd.addOrderDetail(orderDetail);
    }

    updateQuantity(orderDetail) {
        return this.odd.updateQuantity(orderDetail);
    }

    deleteOrderDetail(orderDetail) {
        return this.odd.deleteOrderDetail(orderDetail);
    }
}

module.exports = OrderDetailController;