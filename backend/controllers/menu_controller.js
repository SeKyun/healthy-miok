const menu_list = require('../data/menu.json');
const res_handler = require('../library/status_handler');
const url = require('url');
// const kakao_api = require('../library/kakao_open_api_image'); 
const request = require('request'); 
const KAKAO_REST_API_KEY = 'KakaoAK 89b667c46778ddf37b089136557f0da3'; 
// const res_handler = require('../library/status_handler'); 

function get_random_menu(array) {
	const MENU_CNT = 6;

	if (! array) {
		var array = []; 
	}

	let n = Math.floor(Math.random() * MENU_CNT); 

	if (array.length  < 2 && array.indexOf(n) < 0) {
		array.push(n); 
		return get_random_menu(array); 
	} else {
		return array; 
	}
}

 function get_img_url (key_word) {
    const option = {
        query: key_word
    }
    request.get({
        uri: 'https://dapi.kakao.com/v2/search/image?page=1&size=50',
        qs: option,
        headers: {
            'Authorization': KAKAO_REST_API_KEY
        }
    }, function (err, res, body) {
        let json = JSON.parse(body) //json으로 파싱
        console.log("이것이 나와야 함!!!!" + json.documents[0].image_url);
        
        let image_url = json.documents[0].image_url; 
        return image_url; 
    })
}

exports.get_menu = async function (req, res) {

	try {
		let queryData = url.parse(req.url, true).query;
		let country = queryData.country;
		let type = queryData.type;
		const MENU_CNT = 6;
		let menues = {}; 
		let index = 0; 
		let result = [{"menu":"", "img_url": ""}, {"menu":"", "img_url": ""}]; 
		switch(country) {
			case 'korea':
				menues = menu_list.korea.food_list[type]; 
				result[0].img_url = menu_list.korea.image_url; 
				result[1].img_url = menu_list.korea.image_url;
				break; 
			case 'boonsick':
				menues = menu_list.boonsick.food_list[type]; 
				result[0].img_url = menu_list.boonsick.image_url;
				result[1].img_url = menu_list.boonsick.image_url; 
				break; 
			case 'ameria':
				menues = menu_list.america.food_list[type]; 
				result[0].img_url = menu_list.america.image_url;
				result[1].img_url = menu_list.america.image_url; 

				break; 
			case 'europe':
				menues = menu_list.europe.food_list[type]; 
				result[0].img_url = menu_list.europe.image_url; 
				result[1].img_url = menu_list.europe.image_url; 

				break; 
			case 'china':
				menues = menu_list.china.food_list[type]; 
				result[1].img_url = menu_list.china.image_url; 

				result[0].img_url = menu_list.china.image_url; 
				break; 
			case 'japan':
				menues = menu_list.japan.food_list[type];
				result[0].img_url = menu_list.japan.image_url; 
				result[1].img_url = menu_list.japan.image_url; 

				break; 
		}
		 console.log(menues); 
		index = Math.floor(Math.random() * MENU_CNT); 
		let menu_idxes = get_random_menu([]); 
		result[0].menu = menues[menu_idxes[0]]; 
		result[1].menu = menues[menu_idxes[1]]; 
		
		console.log(result); 
		
		// result.menu = menues[index];
		// result.image_url = menues.img
		// result.image_url = await get_img_url(result.menu); 

		return res_handler.sendSuccess(result, 200, res, 'menu');

	} catch (error) {
		let result = {}; 
		console.log(error); 
		return res_handler.sendSuccess(result, 200, res, 'menu');

	} finally {
		
	}
};
