const config = require("../Common/Config");
const sql = require("mssql");

class GeneralDAL {
    constructor() {
    }

    runQuery(query) {
        let self = this;
        return sql.connect(config.db).then(function () {
            return new sql.Request().query(query).then(function (recordset) {
                sql.close();
                return recordset;
            });
        });
    }

    runCRUD(query) {
        let self = this;
        return sql.connect(config.db).then(function () {
            return new sql.Request().query(query).then(function (recordset) {
                sql.close();
                return recordset.rowsAffected;
            });
        });
    }
}

module.exports = GeneralDAL;
