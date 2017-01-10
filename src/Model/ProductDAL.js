const GeneralDAL = require("./GeneralDAL");

class ProductDAL extends GeneralDAL {
    constructor() {
        super();
    }

    getAllProduct() {
        return this.runQuery("SELECT * FROM product");
    }

    getProductByID(id) {
        return this.runQuery(`SELECT * FROM product WHERE productID = ${id}`)
            .then(result => result[0]);
    }

    getProductByType(typeID) {
        return this.runQuery(`SELECT * FROM product WHERE productTypeID  = ${typeID}`);
    }

}

module.exports = ProductDAL;