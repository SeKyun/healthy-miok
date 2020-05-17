// 사용하는 배포 중간 서버(= gitAction)에 직접 정의해야함. 
// module.exports = {
//     mysqlHOST: secrets.mysqlHOST,
//     mysqlPORT: secrets.mysqlPORT,
//     mysqlUSER: secrets.mysqlUSER, 
//     mysqlPASSWORD: secrets.mysqlPASSWORD, 
//     mysqlDATABASE: secrets.mysqlDATABASE
// }

// module.exports = {
//     mysqlHOST: process.env.mysqlHOST,
//     mysqlUSER: process.env.mysqlUSER, 
//     mysqlPASSWORD: process.env.mysqlPASSWORD, 
//     mysqlDATABASE: process.env.mysqlDATABASE
// }

module.exports = {
    mysqlHOST: 'healthy-miok-db.css640snysar.ap-northeast-2.rds.amazonaws.com', 
    mysqlPORT: 3306,
    mysqlUSER: 'admin',
    mysqlPASSWORD: 'jigunmiok1118', 
    mysqlDATABASE: 'healthy_miok'
}