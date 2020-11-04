const menu_list = require('../data/menu.json');
const res_handler = require('../library/status_handler');
const url = require('url');

exports.get_menu = function (req, res) {
	let queryData = url.parse(req.url, true).query;
	let country = queryData.country;
	let type = queryData.type;
	const MENU_CNT = 6;
	let menues = ""; 
	let index = 0; 
	let result = 0; 

	switch(country) {
		case 'korea':
			menues = menu_list.korea[type]; 
			break; 
		case 'boonsick':
			menues = menu_list.boonsick[type]; 
			break; 
		case 'ameria':
			menues = menu_list.america[type]; 
			break; 
		case 'europe':
			menues = menu_list.europe[type]; 
			break; 
		case 'china':
			menues = menu_list.china[type]; 
			break; 
		case 'japan':
			menues = menu_list.japan[type];
			break; 
	}
	 
	index = Math.floor(Math.random() * MENU_CNT); 
	
	result = menues[index]; 
	console.log(result + " " + index);

	return res_handler.sendSuccess(result, 200, res, 'menu'); 

};
