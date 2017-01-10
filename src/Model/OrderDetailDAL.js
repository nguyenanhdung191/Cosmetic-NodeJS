const GeneralDAL = require("./GeneralDAL");
const ProductDAL = require("./ProductDAL");

class OrderDetailDAL extends GeneralDAL {
    constructor() {
        super();
        this.pd = new ProductDAL();
    }

    getOrderDetailByOrderID(orderID) {
        return this.runQuery(`SELECT * FROM "orderdetail" WHERE orderID = ${orderID}`)
            .then(result => {
                result.forEach(row => {

                });
            });
    }

}

module.exports = OrderDetailDAL;
