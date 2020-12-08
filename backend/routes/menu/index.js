let express = require('express');
let router = express.Router();
let kakao_api = require('../../library/kakao_open_api_image');
let controller = require('../../controllers/menu_controller');
// const { get } = require('https');

router.get('/', async function (req, res) {
	let result = await controller.get_menu(req, res);
	console.log('here is router: ' + result[0].menu);
	console.log('here is router: ' + result[1].menu);
	// console.log(result[0].menu);
	// console.log(result[1].menu);

	res.json(result);
});
// 새로 정의한 것.
// let url = require('url');
// const menu_list = require('../../data/menu.json');
// const request = require('request');

// const KAKAO_REST_API_KEY = 'KakaoAK 89b667c46778ddf37b089136557f0da3';

// function get_random_menu(array) {
// 	const MENU_CNT = 6;
// 	array[0] =  Math.floor(Math.random() * MENU_CNT);
// 	array[1] =  Math.floor(Math.random() * MENU_CNT);
// 	while(array[0] === array[1]) {
// 		array[1] = Math.floor(Math.random() * MENU_CNT);
// 	}

// 	return array;
// }

// router.get('/', function(req, res, next){

// 		let queryData = url.parse(req.url, true).query;
// 		let country = queryData.country;
// 		let type = queryData.type;
// 		const MENU_CNT = 6;
// 		let menues = {};
// 		let index = 0;
// 		let result = [{"index": "", "menu":"", "img_url":""}, {"index": "", "menu":"", "img_url":""}];
// 		switch(country) {
// 			case 'korea':
// 				menues = menu_list.korea.food_list[type];
// 				result[0].img_url = menu_list.korea.image_url;
// 				result[1].img_url = menu_list.korea.image_url;
// 				break;
// 			case 'boonsick':
// 				menues = menu_list.boonsick.food_list[type];
// 				result[0].img_url = menu_list.boonsick.image_url;
// 				result[1].img_url = menu_list.boonsick.image_url;
// 				break;
// 			case 'ameria':
// 				menues = menu_list.america.food_list[type];
// 				result[0].img_url = menu_list.america.image_url;
// 				result[1].img_url = menu_list.america.image_url;

// 				break;
// 			case 'europe':
// 				menues = menu_list.europe.food_list[type];
// 				result[0].img_url = menu_list.europe.image_url;
// 				result[1].img_url = menu_list.europe.image_url;

// 				break;
// 			case 'china':
// 				menues = menu_list.china.food_list[type];
// 				result[1].img_url = menu_list.china.image_url;

// 				result[0].img_url = menu_list.china.image_url;
// 				break;
// 			case 'japan':
// 				menues = menu_list.japan.food_list[type];
// 				result[0].img_url = menu_list.japan.image_url;
// 				result[1].img_url = menu_list.japan.image_url;

// 				break;
// 		}
// 		 console.log(menues);
// 		index = Math.floor(Math.random() * MENU_CNT);
// 		let menu_idxes = get_random_menu([]);
// 		console.log(menu_idxes);
// 		result[0].menu = menues[menu_idxes[0]];
// 		result[0].index = menu_idxes[0];
// 		result[1].menu = menues[menu_idxes[1]];
// 		result[1].index = menu_idxes[1];

// 		res.result = result;
// 		console.log(res.result);
// 		// console.log("1");
// 		// let img_url = await kakao_api.get_img_url(result[0].menu);
// 		// console.log("3");
// 		// console.log(img_url);
// 		// // result.menu = menues[index];
// 		// // result.image_url = menues.img
// 		// // result.image_url = await get_img_url(result.menu);

// 		// return res_handler.sendSuccess(result, 200, res, 'menu');

// 	next();
// }, function(req, res){
// 	console.log("req:"  + req);
// 	console.log("res: " + res.result[0].menu);
// 	console.log(1);

// 	const option = {
// 		query: res.result[0].menu
// 	}
// 	request.get({
// 		uri: 'https://dapi.kakao.com/v2/search/image?page=1&size=50',
// 		qs: option,
// 		headers: {
// 		'Authorization': KAKAO_REST_API_KEY
// 		}
// 	}, function (err, reseponse, body){
// 		let json = JSON.parse(body) //json으로 파싱
// 		let image_url = json.documents[0].image_url;
// 		res.result[0].img_url = image_url;
// 		return res.status(200).send({
// 			msg: "OK. The request for " + 'menu' + " is successfully done",
// 			success: true,
// 			result: res.result
// 		})

// 	})
// });

module.exports = router;
