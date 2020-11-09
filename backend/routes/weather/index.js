let express = require('express');
let router = express.Router();
let controller = require('../../controllers/weather_controller');
let controller2 = require('../../controllers/blood_sugar_controller');
let url = require('url');

router.get('/', async function (req, res, next) {
    let queryData = await url.parse(req.url, true).query;
    let key_word = queryData.key_word;
    
    const naver_result = await controller.naver_weather_controller.getHtml(key_word); 
    console.log("NAVER RESULT!!!!!!!!!!:" + naver_result); 
    const google_result = await controller.google_weather_controller.getHtml(naver_result[0].city_name);
    naver_result[0].img_src = "http://kweather.co.kr/" + google_result;  
    res.json(naver_result); 
}); 

module.exports = router; 