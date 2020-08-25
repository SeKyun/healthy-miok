// const Sequelize = require('sequelize'); 
const mysql = require("mysql"); 
const config = require('../config/key'); 

let pool = mysql.createPool({
    connectionLimit: 10, 
    host: config.mysqlHOST,
    port: config.mysqlPORT, 
    user: config.mysqlUSER, 
    password: config.mysqlPASSWORD, 
    database: config.mysqlDATABASE,
    timezone: "kst"
}); 

module.exports = pool; 

