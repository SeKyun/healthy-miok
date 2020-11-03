const menu_list = require('../data/menu.json');
const res_handler = require('../library/status_handler');
const url = require('url');

exports.get_menu = function (req, res) {
	let queryData = url.parse(req.url, true).query;
	let country = queryData.country;
	let type = queryData.type;
	const MENU_CNT = 7;
	if (country === 'korea') {
		let menues = menu_list.korea[type];
		let index = Math.floor(Math.random() * MENU_CNT);
		let result = menues[index];

		return res_handler.sendSuccess(result, 200, res, 'menu');
	}
};
