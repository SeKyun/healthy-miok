const menu_list = require('../data/menu.json');
const res_handler = require('../library/status_handler');
const url = require('url');
const kakao_api = require('../library/kakao_open_api_image'); 

exports.get_menu = function (req, res) {
	let queryData = url.parse(req.url, true).query;
	let country = queryData.country;
	let type = queryData.type;
	const MENU_CNT = 6;
	let menues = ""; 
	let index = 0; 
	let result = {}; 

	switch(country) {
		case 'korea':
			menues = menu_list.korea.food_list[type]; 
			// result.img_url = menu_list.korea.image_url; 
			break; 
		case 'boonsick':
			menues = menu_list.boonsick.food_list[type]; 
			// result.img_url = menu_list.boonsick.image_url; 
			break; 
		case 'ameria':
			menues = menu_list.america.food_list[type]; 
			// result.img_url = menu_list.america.image_url; 
			break; 
		case 'europe':
			menues = menu_list.europe.food_list[type]; 
			// result.img_url = menu_list.europe.image_url; 
			break; 
		case 'china':
			menues = menu_list.china.food_list[type]; 
			// result.img_url = menu_list.china.image_url; 
			break; 
		case 'japan':
			menues = menu_list.japan.food_list[type];
			// result.img_url = menu_list.japan.image_url; 
			break; 
	}
	 
	index = Math.floor(Math.random() * MENU_CNT); 
	
	result.menu = menues[index];
	console.log("*********" + kakao_api.get_img_url(result.menu)); 
	result.img_url = kakao_api.get_img_url(result.menu); 

	console.log(result.menu + " " + index);

	return res_handler.sendSuccess(result, 200, res, 'menu'); 

};
