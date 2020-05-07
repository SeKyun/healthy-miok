// 사용하는 배포 중간 서버(= gitAction)에 직접 정의해야함. 
module.exports = {
    mysqlHOST: secrets.mysqlHOST,
    mysqlPORT: secrets.mysqlPORT,
    mysqlUSER: secrets.mysqlUSER, 
    mysqlPASSWORD: secrets.mysqlPASSWORD, 
    mysqlDATABASE: secrets.mysqlDATABASE
}

// module.exports = {
//     mysqlHOST: process.env.mysqlHOST,
//     mysqlUSER: process.env.mysqlUSER, 
//     mysqlPASSWORD: process.env.mysqlPASSWORD, 
//     mysqlDATABASE: process.env.mysqlDATABASE
// }