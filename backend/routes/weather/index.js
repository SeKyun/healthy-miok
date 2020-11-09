let express = require('express');
let router = express.Router();
let controller = require('../../controllers/weather_controller');
let controller2 = require('../../controllers/blood_sugar_controller');
let url = require('url');

router.get('/', async function (req, res, next) {
    let queryData = await url.parse(req.url, true).query;
    let key_word = queryData.key_word;
    
    const naver_result = await controller.naver_weather_controller.getHtml(key_word); 
    console.log("naver_result: " + naver_result); 
    // 검색이 안되었을 경우에
    if (! naver_result[0]) {
        res.status(404).send(
            naver_result
        )
    }
    // 검색이 가능해졌을 경우. 
    else {
        console.log("NAVER RESULT!!!!!!!!!!:" + naver_result); 
        let smog_status = naver_result[0].smog_status;
        
        if (smog_status === '좋음') {
            naver_result[0].smog_img_url = "https://i.pinimg.com/originals/57/89/2d/57892d8f88d5503f5dfc7532ff2642a6.png"; 
        } else if (smog_status === '보통') {
            naver_result[0].smog_img_url = "https://i.pinimg.com/originals/85/c7/29/85c729ec1093b130df2c208d60d54571.png";
        } else {
            naver_result[0].smog_img_url = "https://i.pinimg.com/originals/64/42/35/644235f76829abe9d3e87825ae766049.png"; 
        }

        const google_result = await controller.google_weather_controller.getHtml(naver_result[0].city_name);
        naver_result[0].img_src = "http://kweather.co.kr/" + google_result;  
        res.json(naver_result); 
    }
    
}); 

module.exports = router; 