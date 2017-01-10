const GeneralDAL = require("./GeneralDAL");
const ProductDAL = require("./ProductDAL");

class OrderDetailDAL extends GeneralDAL {
    constructor() {
        super();
        this.pd = new ProductDAL();
    }

    getOrderDetailByOrderID(orderID) {
        return this.runQuery(`SELECT * FROM orderdetail WHERE orderID = ${orderID}`)
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
}

module.exports = OrderDetailDAL;
