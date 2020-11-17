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
                tempmin: $(this).children("div.main_info").children("div.info_data").children("ul.info_list").find("li").children("span.merge").children("span.min").children("span.num").text() + "℃",
                tempmax: $(this).children("div.main_info").children("div.info_data").children("ul.info_list").find("li").children("span.merge").children("span.max").children("span.num").text() + "℃",
                sensible: $(this).children("div.main_info").children("div.info_data").children("ul.info_list").find("li").children("span.sensible").find("em").children("span.num").text() + "℃",
                smog_v: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").children("span.num").eq(0).text(),
                smog_s: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").eq(0).text().slice(-2),
                micro_v: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").children("span.num").eq(1).text(),
                micro_s: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").eq(1).text().slice(-2),
                ozone_v: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").children("span.num").eq(2).text(),
                ozone_s: $(this).children("div.sub_info").children("div.detail_box").children("dl.indicator").children("dd").eq(2).text().slice(-2),
                city_name: $("#main_pack > section.sc_new.cs_weather._weather > div > div.api_cs_wrap > div.blind > h3").text(),
            }
        });
        try {
            if (ulList[0].city_name === undefined || ulList[0].city_name === "") {
                ulList[0].city_name = $("#main_pack > div.sc.cs_weather_global._oversea_weather > div:nth-child(3) > div.api_title_area.blind > h3").text(); 
                if(ulList[0].city_name === "") {
                    ulList[0].city_name = "검색한 지역 날씨"
                }
            }
            if (ulList[0].cast_txt) {
                let cast_status = ulList[0].cast_txt.split(",")[0]; 
                if (cast_status.includes('맑음') || cast_status.includes('화창')){
                    ulList[0].img_url = "https://i.pinimg.com/originals/a5/99/60/a59960d92f95e5c1a343ef917a50ac55.jpg"
                } else if (cast_status.includes('구름')) {
                    ulList[0].img_url = "https://i.pinimg.com/originals/85/9d/50/859d50b6af304e90480dc1822b096ed6.jpg";
                } else if (cast_status.includes('흐림')) {
                    ulList[0].img_url = "https://i.pinimg.com/originals/57/c2/be/57c2beae9d7cafb97fccec0c55128e10.jpg";
                } else if (cast_status.includes('비') || cast_status.includes('폭우')) {
                    ulList[0].img_url = "https://i.pinimg.com/originals/d3/bb/3e/d3bb3e4691aa6195fcae51754f8e6dd8.jpg"; 
                } else if (cast_status.includes('흐린')) {
                    ulList[0].img_url = "https://i.pinimg.com/originals/15/ee/08/15ee08e3318acc82e4352eed7b917cda.jpg"; 
                } else if (cast_status.includes('안개') || cast_status.includes('연무')) {
                    ulList[0].img_url = "https://i.pinimg.com/originals/ea/45/bc/ea45bcb6f91c8167b3abd306d01585a1.jpg"; 
                } else if (cast_status.includes('우박')) {
                    ulList[0].img_url = "https://i.pinimg.com/originals/bd/cd/e1/bdcde1292eadd3bba1f98556962bea92.jpg"; 
                } else if (cast_status.includes('황사')) {
                    ulList[0].img_url = "https://i.pinimg.com/originals/29/c3/c6/29c3c6b8fe913b54cf8a507c9154d43a.jpg"; 
                } else if (cast_status.includes('번개') || cast_status.includes('뇌우')) {
                    ulList[0].img_url = "https://i.pinimg.com/originals/72/4a/9a/724a9a8ed0cfc18bff99f170fe426f92.jpg"; 
                } 
                else {
                    ulList[0].img_url = "https://i.pinimg.com/originals/08/33/46/083346e944bf3658a6acd5e4d2e99706.jpg"; 
                }
            }
    
            const data = ulList[0]; 
            return data; 
        } catch {
            const data = {}; 
            return data; 
        }
        

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




 

    