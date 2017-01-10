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
                    this.getAllOrder()
                        .then(json => {
                            res.json(json);
                        });
                }
                else {
                    res.status(404).send('Invalid URL');
                }
                break;
            }

            case "DELETE": {
                break;
            }
        }
    }

    getAllOrder() {
        return this.od.getAllOrder();
    }
}

module.exports = OrderController;