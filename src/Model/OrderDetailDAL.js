const GeneralDAL = require("./GeneralDAL");
const ProductDAL = require("./ProductDAL");

class OrderDetailDAL extends GeneralDAL {
    constructor() {
        super();
        this.pd = new ProductDAL();
    }

    getOrderDetailByOrderID(orderID) {
        return this.runQuery(`SELECT * FROM "orderdetail" WHERE "orderID" = ${orderID}`)
            .then(result => {
                let ods = [];
                return Promise.all(result.map(od => {
                    return this.pd.getProductByID(od.productID)
                        .then(p => {
                            od.product = p;
                            ods.push(od);
                        });
                })).then(() => {
                    ods.sort((a, b) => {
                        return a.orderDetailID - b.orderDetailID;
                    });
                    return ods;
                });
            });
    }

    getAllOrderDetail() {
        return this.runQuery(`SELECT * FROM "orderdetail"`)
            .then(result => {
                let ods = [];
                return Promise.all(result.map(od => {
                    return this.pd.getProductByID(od.productID)
                        .then(p => {
                            od.product = p;
                            ods.push(od);
                        });
                })).then(() => ods);
            });
    }

    addOrderDetail(orderDetail) {
        let query = `INSERT INTO "orderdetail" ("orderID", "productID", "quantity") `;
        query += "VALUES (" + orderDetail.orderID + ",";
        query += orderDetail.productID + ",";
        query += orderDetail.quantity + ")";
        return this.runCRUD(query);
    }

    updateQuantity(orderDetail) {
        let query = `UPDATE "orderdetail"
                    SET "quantity"=${orderDetail.quantity} 
                    WHERE "orderDetailID"=${orderDetail.orderDetailID}`;
        return this.runCRUD(query);
    }

    deleteOrderDetail(orderDetail) {
        return this.runCRUD(`DELETE FROM "orderdetail" WHERE "orderDetailID" = ${orderDetail.orderDetailID}`);
    }
}

module.exports = OrderDetailDAL;
