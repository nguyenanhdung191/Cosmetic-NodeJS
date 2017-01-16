const Model = require("../Model/Model");

class ProductController {
    constructor() {
        this.pd = new Model.ProductDAL();
    }

    service(req, res) {
        switch (req.method) {
            case "GET": {
                let queries = req.query;
                if (Object.keys(queries).length === 0 && queries.constructor === Object) {
                    this.getAllProduct()
                        .then(json => {
                            res.json(json);
                        });
                } else if (Object.keys(queries).length === 1 && queries.hasOwnProperty("id")) {
                    this.getProductByID(queries.id)
                        .then(json => {
                            res.json(json);
                        });
                } else if (Object.keys(queries).length === 1 && queries.hasOwnProperty("type")) {
                    this.getProductByType(queries.type)
                        .then(json => {
                            res.json(json);
                        });
                } else {
                    res.status(404).send('Invalid URL');
                }
                break;
            }
            case "PUT": {
                break;
            }
            case "POST": {
                this.addProduct(req.body)
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
                this.removeProduct(req.body)
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

    getAllProduct() {
        return this.pd.getAllProduct();
    }

    getProductByID(id) {
        return this.pd.getProductByID(id);
    }

    getProductByType(typeID) {
        return this.pd.getProductByType(typeID);
    }

    addProduct(product) {
        return this.pd.addProduct(product);
    }

    removeProduct(product) {
        return this.pd.removeProduct(product);
    }
}

module.exports = ProductController;