const GeneralDAL = require("./GeneralDAL");
const OrderDetailDAL = require("./OrderDetailDAL");

class OrderDAL extends GeneralDAL {
    constructor() {
        super();
        this.odd = new OrderDetailDAL();
    }

    getCurrentOrder() {
        return this.runQuery(`SELECT * FROM "order" WHERE "orderStateCode" = -1 ORDER BY "orderDate" ASC`);
    }

    getAllOrder() {
        return this.runQuery(`SELECT * FROM "order"`);
    }

    getOrderByID(id) {
        return this.runQuery(`SELECT * FROM "order" WHERE "orderID" = ${id}`)
            .then(result => result[0]);
    }

    addOrder(order) {
        let query = `INSERT INTO "order" ("orderCustomerName", "orderAddress", "orderPhoneNumber", "orderStateCode", "orderDate")
                     VALUES ('${order.orderCustomerName}',
                     '${order.orderAddress}',
                     ${order.orderPhoneNumber},
                     -1,
                     now()::timestamp)`;
        return this.runCRUD(query);
    }

    deleteOrder(order) {
        return this.runCRUD(`DELETE FROM "orderdetail" WHERE "orderID" = ${order.orderID}`)
            .then(() => {
                return this.runCRUD(`DELETE FROM "order" WHERE "orderID" = ${order.orderID}`)
            });
    }

    closeOrder(order) {
        let query = `UPDATE "order" 
                     SET orderStateCode = 1 
                     WHERE orderID = ${order.orderID}`;
        return this.runCRUD(query);
    }

}

module.exports = OrderDAL;
