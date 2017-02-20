const GeneralDAL = require("./GeneralDAL");

class ProductTypeDAL extends GeneralDAL {
    constructor() {
        super();
    }

    getAllProductType(){
        return this.runQuery(`SELECT * FROM "producttype"`);
    }
}

module.exports = ProductTypeDAL;