const mysql = require("mysql"); 
const config = require('../config/key'); 

let pool = mysql.createPool({
    connectionLimit: 50, 
    host: config.mysqlHOST,
    port: config.mysqlPORT, 
    user: config.mysqlUSER, 
    password: config.mysqlPASSWORD, 
    database: config.mysqlDATABASE

}); 

module.exports = pool; 

