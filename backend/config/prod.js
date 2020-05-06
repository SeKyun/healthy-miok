// 사용하는 배포 중간 서버(= gitAction)에 직접 정의해야함. 
module.exports = {
    mysqlHOST: secrets.mysqlHOST,
    mysqlPORT: secrets.mysqlPORT,
    mysqlUSER: secrets.mysqlUSER, 
    mysqlPASSWORD: secrets.mysqlPASSWORD, 
    mysqlDATABASE: secrets.mysqlDATABASE
}