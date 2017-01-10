const GeneralDAL = require("./GeneralDAL");

class OrderDAL extends GeneralDAL {
    constructor() {
        super();
    }

    getCurrentOrder() {
        return this.runQuery(`SELECT * FROM "order" WHERE orderStateCode = -1`);
    }

    getAllOrder() {
        return this.runQuery(`SELECT * FROM "order"`);
    }

}

module.exports = OrderDAL;
