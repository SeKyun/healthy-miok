const db = require("../data/db"); 

const res_handler = require('../library/status_handler'); 


const url = require('url'); 

exports.get_result = function (req, res) {
    let queryData = url.parse(req.url, true).query;
    let q1 = Number(queryData.q1);
    let q2 = Number(queryData.q2);
    let q3 = Number(queryData.q3);
    let q4 = Number(queryData.q4);
    let q5 = Number(queryData.q5);

    let q_total = q1 + q2 + q3 + q4 + q5; 
    let result = {
        ans_cnt: q_total,
    };
    if (q_total < 2) {
        result.ability = '보통의 추리력';
    } else if (q_total < 4) {
        result.ability = '예리한 추리력'; 
    } else if (q_total >= 4) {
        result.ability = '아주 뛰어난 추리력';
    }

    return res_handler.sendSuccess(result, 200, res, "detective_test"); 

}