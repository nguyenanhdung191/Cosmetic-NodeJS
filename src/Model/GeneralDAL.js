const config = require("../Common/Config");
const sql = require("mssql");

class GeneralDAL {
    constructor() {
    }

    runQuery(query) {
        return new sql.Request().query(query).then(function (recordset) {
            return recordset;
        });
    }

    runCRUD(query) {
        let request;
        return request = new sql.Request().query(query).then(function (recordset) {
            return request.rowsAffected;
        });
    }
}

module.exports = GeneralDAL;
