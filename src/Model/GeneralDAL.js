const config = require("../Common/Config");

class GeneralDAL {
    constructor() {
    }

    runQuery(query) {
        return config.db.query(query).then(result => result);
    }

    runCRUD(query) {
        return config.db.result(query).then(result => result.rowCount);
    }
}

module.exports = GeneralDAL;
