const GeneralDAL = require("./GeneralDAL");

class OrderDAL extends GeneralDAL {
    constructor() {
        super();
    }

    getCurrentOrder() {
        return this.runQuery(`SELECT * FROM "order" WHERE orderStateCode = -1 ORDER BY orderDate ASC`);
    }

    getAllOrder() {
        return this.runQuery(`SELECT * FROM "order"`);
    }

    getOrderByID(id) {
        return this.runQuery(`SELECT * FROM "order" WHERE orderID = ${id}`)
            .then(result => result[0]);
    }

    addOrder(order) {
        let query = `INSERT INTO "order" (orderCustomerName, orderAddress, orderPhoneNumber, orderStateCode, orderDate)
                     VALUES (N'${order.orderCustomerName}',
                     N'${order.orderAddress}',
                     ${order.orderPhoneNumber},
                     -1,
                     GETDATE())`;
        return this.runCRUD(query);
    }

    deleteOrder(order) {
        return this.runCRUD(`DELETE FROM "order" WHERE orderID = ${order.orderID}`);
    }

}

module.exports = OrderDAL;
