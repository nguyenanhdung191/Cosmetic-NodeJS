const GeneralDAL = require("./GeneralDAL");
const fs = require("fs");

class ProductDAL extends GeneralDAL {
    constructor() {
        super();
    }

    getAllProduct() {
        return this.runQuery(`SELECT * FROM "product"`);
    }

    getProductByID(id) {
        return this.runQuery(`SELECT * FROM "product" WHERE "productID" = ${id}`)
            .then(result => result[0]);
    }

    getProductByType(typeID) {
        return this.runQuery(`SELECT * FROM "product" WHERE "productTypeID" = ${typeID}`);
    }

    addProduct(product) {
        let query = `INSERT INTO "product" ("productName", "productPrice", "productDescription", "productTypeID", "productImageUrl")
                     VALUES ('${product.productName}',
                     ${product.productPrice},
                     '${product.productDescription}',
                     ${product.productTypeID},
                     ${(product.productImageUrl == "") ? "NULL" : `'${product.productImageUrl}'`})`;
        return this.runCRUD(query);
    }

    removeProduct(product) {
        return this.runCRUD(`DELETE FROM product WHERE productID = ${product.productID}`);
    }

    editProduct(product) {
        let query = `UPDATE "product"  
                     SET "productName" = '${product.productName}',
                     "productPrice" = '${product.productPrice}',
                     "productDescription" = '${product.productDescription}',
                     "productTypeID" = ${product.productTypeID}
                     ${(product.productImageUrl == "") ? " " : `,productImageUrl = '${product.productImageUrl}' `} 
                     WHERE "productID" = ${product.productID}`;
        return this.runCRUD(query);
    }

}

module.exports = ProductDAL;