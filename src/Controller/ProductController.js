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

            case "DELETE": {
                break;
            }
        }
    }

    getAllProduct(){
        return this.pd.getAllProduct();
    }

    getProductByID(id){
        return this.pd.getProductByID(id);
    }
    getProductByType(typeID){
        return this.pd.getProductByType(typeID);
    }
}

module.exports = ProductController;