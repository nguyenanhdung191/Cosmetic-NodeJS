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
                }
                break;
            }

            case "DELETE": {
                break;
            }
        }
    }

    getOrderDetailByOrderID(orderID) {
        return this.odd.getOrderDetailByOrderID(orderID);
    }
}

module.exports = OrderDetailController;