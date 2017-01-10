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
        return new sql.Request().query(query).then(function (recordset) {
            return recordset.rowsAffected;
        });
    }
}

module.exports = GeneralDAL;
