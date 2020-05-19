
/**
 * 응답 헤더의 상태코드
 * 
 * 2XX - 성공//////
 *     201 - created: POST 요청시 서버에서 자원생성 성공
 *     204 - No Content: 서버에서 성공후, 응답할 바디가 없음.
 * 
 * 4XX - 클라이언트 요청 에러//////
 *     401 - Unauthorized: 인증이 필요한 api 에 대해 인증되지 않은 요청일 경우
 *     403 - Forbbiden: 금지된 요청 (401과 비슷, 해석마다 다름)
 *     404 - Not found: 조회할 자원이 서버에 없는 경우 응답, * 라우터 경로 오타/ 다름 주의
 *     409 - Conflit: 클라이언트에서 POST로 서버에 자원 생성을 요청했을 때 이미 그 자원이 
 *                    서버에 있어 자원을 생성할 수 없음.
 * 
 * 5XX - 서버 응답 에러 //////
 *     500 - (Healthy Miok에서만) Database request Unavailable: 데이터베이스 접근 요청이 유효하지 않음. 
 *     503 - Service Unavailable: 서버가 과부하 상태/ 점검 상태 일시적으로 요청 처리 
 *     504 - Gateway Timeout: 서버를 통하는 게이트웨이에 문제발생하여 시간 초과
 *     505 - HTTP version Not Supported: 해당 HTTP 버전에서는 지원되지 않는 요청. 
 */

 module.exports = {
      sendError: (err, status, res, target) => {
        
        switch (status) {
            case 401:
                return res.status(401).send({
                    msg: "the api request of " + target + " is NOT AUTHORIZED !", 
                    success: false, 
                    result: err
                })
                break;

            case 403:
                return res.status(403).send({
                    msg: "the reqest of the access for " + target + " is FORBBIDEN !", 
                    success: false, 
                    result: err
                })
                break; 

            case 404:
                return res.status(404).send({
                    msg: "the request of " + target + " is NOT FOUND ! ", 
                    success: false, 
                    result: err
                })
                break; 

            case 409:
                return res.status(409).send({
                    msg: "the resouce " + target + " is already ALREADY EXIST !", 
                    success: false, 
                    result: err
                })
                break;

            case 500:
                return res.status(500).send({
                    msg: "the request for database " + target + " is REJECTED !", 
                    success: false, 
                    result: err
                })
                break; 
            
            case 503:
                return res.status(503).send({
                    msg: "service is now UNAVAILABLE !", 
                    success: false, 
                    result: err
                })
                break; 

            case 504: 
                return res.status(504).send({
                    msg: "the gateway has a problem so it takes much time, GATEWAY TIMOUT", 
                    success: false, 
                    result: err
                })
                break; 

            case 505:
                return res.status(505).send({
                    msg: "the request throught XX version is NOT SUPPORTED at this server",
                    success: false, 
                    result: err
                })
                break; 

            default:
                return res.send({
                    msg: "this is error with no specific description", 
                    success: false, 
                    result: err
                })
        }
      }, 

      sendSuccess: (result, status, res, target) => {

        switch (status) {
            case 200:
                return res.status(200).send({
                    msg: "OK the request for " + target + " is successfully done", 
                    success: true, 
                    result: result
                })
                return; 

            case 201:
                return res.status(201).send({
                    msg: "the new " + target + " data is created", 
                    success: true, 
                    result: result
                })
                return; 

            case 204:
                return res.status(204).send({
                    msg: "the " + target + " reqest is successfully done and there is no result data", 
                    success: true
                })
                return; 
            
        }


      }
 }