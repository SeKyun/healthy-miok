let express = require('express');
let router = express.Router();
let controller = require('../../controllers/weather_controller');
let controller2 = require('../../controllers/blood_sugar_controller');
let url = require('url');

router.get('/', async function (req, res, next) {
    let queryData = await url.parse(req.url, true).query;
    let key_word = queryData.key_word;
    
    const result = await controller.naver_weather_controller.getHtml(key_word); 
    console.log("naver_result: " + result); 
    // 검색이 안되었을 경우에
    if (! result.cast_txt) {
        res.status(404).send(
            result
        )
    }
    // 검색이 가능해졌을 경우. 
    else {
        console.log("NAVER RESULT!!!!!!!!!!:" + result); 
        let smog_s = result.smog_s;
        
        if (smog_s === '좋음') {
            result.smog_img_url = "https://i.pinimg.com/originals/57/89/2d/57892d8f88d5503f5dfc7532ff2642a6.png"; 
        } else if (smog_s === '보통') {
            result.smog_img_url = "https://i.pinimg.com/originals/85/c7/29/85c729ec1093b130df2c208d60d54571.png";
        } else {
            result.smog_img_url = "https://i.pinimg.com/originals/64/42/35/644235f76829abe9d3e87825ae766049.png"; 
        }

        res.json(result); 
    }
    
}); 

module.exports = router; 