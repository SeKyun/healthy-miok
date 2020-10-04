// 사용하는 배포 중간 서버(= gitAction)에 직접 정의해야함. 
// module.exports = {
//     mysqlHOST: secrets.MYSQLHOST,
//     mysqlPORT: secrets.MYSQLPORT,
//     mysqlUSER: secrets.MYSQLUSER, 
//     mysqlPASSWORD: secrets.MYSQLPASSWORD, 
//     mysqlDATABASE: secrets.MYSQLDATABASE
// }

module.exports = {
    mysqlHOST: process.env.MYSQLHOST,
    mysqlUSER: process.env.MYSQLUSER, 
    mysqlPASSWORD: process.env.MYSQLPASSWORD, 
    mysqlDATABASE: process.env.MYSQLDATABASE
}

// module.exports = {
//     mysqlHOST: 'healthy-miok-db.css640snysar.ap-northeast-2.rds.amazonaws.com', 
//     mysqlPORT: 3306,
//     mysqlUSER: 'admin',
//     mysqlPASSWORD: 'jigunmiok1118', 
//     mysqlDATABASE: 'healthy_miok'
// }