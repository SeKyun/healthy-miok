const mysql = require("mysql"); 

let pool = mysql.createPool({
    connectionLimit: 50, 
    host: "healthy-miok-db.css640snysar.ap-northeast-2.rds.amazonaws.com", 
    port: 3306, 
    user: "admin", 
    password: "jigunmiok1118", 
    database: "healthy_miok"

}); 

module.exports = pool; 

