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
    let r = {
        cnt: q_total,
    };
    if (q_total < 2) {
        r.comment = '보통 사람의 추리력을 지녔어요!';
        r.img_url = 'https://i.pinimg.com/originals/87/7a/45/877a456a618b506059121e309d45c015.png'

    } else if (q_total < 4) {
        r.comment = '예리한 추리력을 지녔어요! 당신.. 추리 좀 하는 놈인가?';
        r.img_url = 'https://i.pinimg.com/564x/81/35/22/8135224c100c7fa7b35b5142e4fa3d17.jpg' 
    } else if (q_total >= 4) {
        r.comment = '아주 뛰어난 추리력을 지녔어요!! ';
        r.img_url = 'https://i.pinimg.com/564x/73/1a/7f/731a7f0e2038600129c9e2c812f9f00e.jpg'
    }

    return res_handler.sendSuccess(r, 200, res, "detective_test"); 

}