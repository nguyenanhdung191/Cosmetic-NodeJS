const pgp = require("pg-promise")();
let connection = {
    host: 'localhost',
    port: 5432,
    database: 'Cosmetic',
    user: 'postgres',
    password: 'admin'
};
const db = pgp(connection);
module.exports = {db};