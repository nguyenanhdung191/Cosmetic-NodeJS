const Model = require("../Model/Model");

class ProductTypeController {
    constructor() {
        this.pd = new Model.ProductTypeDAL();
    }

    service(req, res) {
        this.getAllProductType().then(json => res.json(json));
    }

    getAllProductType(){
        return this.pd.getAllProductType();
    }
}

module.exports = ProductTypeController;