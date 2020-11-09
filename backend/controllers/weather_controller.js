const axios = require('axios');
const cheerio = require('cheerio'); 
const router = require('../routes/menu');
const log = console.log; 

/**
 * 안된 코드
 *  const function = () => {
 * }
 * 해놓고  exports  를 했음. 
 * 근데 이것은 그냥. 객체가 아니라 text 일 뿐이어서 함수로서 어떠한 영향을 끼쳐줄 수 없음. 
 * 그래서 
 *  밖에서 function_execute 함수를 만들어주고, 그 안에서 그 함수를 실행하도록 하여 어떤 객체로서 역할을 할 수 있게 만들어준다. 
 */
exports.naver_weather_controller = function() {
    const _filter = (html) => {
        // console.log(html.data); 
        let ulList = []; 
        const $  = cheerio.load(html.data); 
        const $bodyList  = $("div._mainTabContent");
        $bodyList.each(function (i, elem) {
            ulList[i] = {
                todaytemp : $(this).children("div.main_info").children("div.info_data").find("p.info_temperature").children("span.todaytemp").text(),
                cast_txt: $(this).children("div.main_info").children("div.info_data").children("ul.info_list").find("li").children("p.cast_txt").text(),
                tempmin: $(this).children("div.main_info").children("div.info_data").children("ul.info_list").find("li").children("span.merge").children("span.min").children("span.num").text(),
                tempmax: $(this).children("div.main_info").children("div.info_data").children("ul.info_list").find("li").children("span.merge").children("span.max").children("span.num").text(),
                sensible: $(this).children("div.main_info").children("div.info_data").children("ul.info_list").find("li").children("span.sensible").find("em").children("span.num").text(),
                smog_value: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").children("span.num").eq(0).text(),
                smog_status: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").eq(0).text().slice(-2),
                microsmog_value: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").children("span.num").eq(1).text(),
                microsmog_status: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").eq(1).text().slice(-2),
                ozone_value: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").children("span.num").eq(2).text(),
                ozone_status: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").eq(2).text().slice(-2),
                city_name: $("#main_pack > section.sc_new.cs_weather._weather > div > div.api_cs_wrap > div.blind > h3").text(),
            }
        });

        const data = ulList.filter(n => n.todaytemp); 
        return data; 

    }
    const _getHtml = async (key_word) => {
        try {
            console.log("*&*&*&*&**&&*지역!!!!:" + key_word);
            return await axios.get('https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=' + encodeURIComponent(key_word) + encodeURIComponent(" 날씨"));
        } catch (err) {
            console.error(err); 
        }
    }
    const getHtml = async(key_word) => {
        const html = await _getHtml(key_word);
        const r = await _filter(html);
        return r;
    }
    return {
        getHtml : getHtml
    }
}(); 

//google weather controller
exports.google_weather_controller = function() {
    const _filter = (html, key_word) => {
        console.log("key_word!!!:" + key_word);
        let img_url = "icon/40icon/icon1.png"; 
        const $  = cheerio.load(html.data); 
        const $bodyList  = $('#Container > div:nth-child(3) > div.kma_city_present > ul > li > table > tbody > tr');

        $bodyList.each(function (i, elem) {
            console.log("***text:" + $(this).children('td:nth-child(1)').text()); 
            if (key_word.includes($(this).children('td:nth-child(1)').text())) {
                console.log("들어옴"); 
                img_url = $(this).children('td:nth-child(2)').children('img').attr('src'); 

            }
        });
        
        console.log(img_url); 
        return img_url; 

    }
    const _getHtml = async (key_word) => {
        try {
            let url = 'http://www.kweather.co.kr/kma/kma_city.html';
            return await axios.get(url);
        } catch (err) {
            console.error(err); 
        }
    }
    const getHtml = async(key_word) => {
        const html = await _getHtml(key_word);
        const r = await _filter(html, key_word);
        return r;
    }
    return {
        getHtml : getHtml
    }
}(); 




 

    