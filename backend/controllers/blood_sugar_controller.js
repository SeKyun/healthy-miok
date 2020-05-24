const db = require("../data/db"); 
const lib = require('../library/blood_sugar_lib'); 
const res_handler = require('../library/status_handler'); 
const resource = "blood_sugar"; 
const moment = require('moment'); 
const url = require('url'); 

// possible error point 
exports.register = function (req, res) {
    let req_data = {
        today: req.body.today, 
        _when: req.body.when, 
        _value: req.body.value,
        _status: 0,
        memo: req.body.memo 
    }; 

    // status 설정
    req_data._status = lib.setBloodSugarStatus(req_data._value, req_data._when); 

    // 기타 설정 
    if (req_data._when === '기타') {
        req_data.desc_etc = req.body.desc_etc; 
    }

    // _time, _date 설정
    let now = moment(); 
    req_data._time = now.format("HH:mm:ss"); 
    req_data._date = now.format('YYYY-MM-DD'); 

    let sql = `INSERT INTO blood_sugar SET ?`; 
    db.query(sql, req_data, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "creating " + resource); 
        }

        return res_handler.sendSuccess(result, 201, res, "creating " + resource); 
    });     
}

exports.get_all = function (req, res) {
    let sql = `SELECT * FROM blood_sugar ORDER BY today DESC`; 

    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
          }
      
          if (!result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
          }
      
          return res_handler.sendSuccess(result, 200, res, resource); 
        });
}

exports.delete_all = function (req, res) {
    let sql = `DELETE FROM blood_sugar`; 
    db.query(sql, function (err, result) {
        if (err) { 
            return res_handler.sendError(err, 500, res, "deleting " + resource); 
          }
      
          return res_handler.sendSuccess(result, 204, res, "deleting " + resource); 
        });
}


// get info by using today and when
// *** possible error point ***
exports.get_record = function (req, res) {
    var queryData = url.parse(req.url, true).query; 
    let today = queryData.today; 
    let when = queryData.when; 

    console.log("queryData: ", queryData); 

    let sql = `SELECT * FROM blood_sugar WHERE today=? AND _when=?`; 
    db.query(sql, [today, when], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }

        else if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, "getting " + resource); 
        }

        return res_handler.sendSuccess(result, 200, res, "getting " + resource); 
    })
}

/** 
 * - today, _when 은 바꿀 수 없음
 * status _value 에 맞게 다시 계산
 */
exports.update_record = function (req, res) {
    let today = req.query.today; 
    let when = req.query.when; 

    let req_data = {
        _value: req.body.value, 
        memo: req.body.memo, 
        edited: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    }

    let sql = `SELECT _when, desc_etc FROM blood_sugar WHERE today=? AND _when=?`; 
    db.query(sql, [today, when], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        else if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        // update table 
        else {
            let status = lib.setBloodSugarStatus(when, req_data._value); 

            if (when === '기타') {
                req_data.desc_etc = req.body.desc_etc; 
                sql = `UPDATE blood_sugar SET desc_etc=? _value=? _status=? memo=? edited=? WHERE today=? AND _when=?`;
                db.query(sql, [req_data.desc_etc, req_data._value, status, req_data.memo, req_data.edited, today, when], 
                    function (err2, result2) {
                        if (err2) {
                            return res_handler.sendError(err2, 500, res, "inserting " + resource); 
                        }

                        return res_handler.sendSuccess(result2, 204, "inserting " + resource); 
                    }) 
            }

            else {
                sql = `UPDATE blood_sugar SET _value=? status=? memo=? edited=? WHERE today=? AND _when=?`; 
                db.query(sql, [req_data._value, status, req_data.memo, req_data.edited, today, when], 
                    function (err2, result2) {
                        if (err2) {
                            return res_handler.sendError(err2, 500, res, "inserting " + resource); 
                        }

                        return res_handler.sendSuccess(result2, 204, "inserting " + resource); 
                    })
                }
        }
    }) 
}

// date기간을 통해 데이터를 받음
exports.get_records_date = function (req, res) {
    var queryData = url.parse(req.url, true).query; 
    let startDate = queryData.startDate; 
    let startDate = queryData.endDate; 

    console.log("queryData: ", queryData); 
    
    let sql = `SELECT * FROM blood_sugar WHERE today >=${startDate} AND today <= ${endDate}`; 
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        else if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}

// today를 통해 데이터를 받음 
exports.get_records_today = function (req, res) {
    let today = req.body.today; 

    let sql = `SELECT * FROM blood_sugar WHERE today=? ORDER BY _when`; 
    db.query(sql, [today], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }
        
        else if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
            
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}

//  graph 만들 때 - when을 통해 데이터를 받음
exports.get_records_when = function (req, res) {
    let when = req.body.when; 

    let sql;

    // 기타 빼고, 기상직후, 취침 전, 새벽 검색 가능 

    if (when === 'morning' || when === 'night' || when === 'dawn') {
        sql = `SELECT id, _when, _value, _status FROM blood_sugar WHERE _when=?`; 
        if (when === 'morning') {
            when = '기상 직후'; 
        }
        else if (when === 'night') {
            when = '취침 전'; 
        }
        // when === 'dawn'
        else {
            when = '새벽'; 
        }

        db.query(sql, [when], function (err, result) {

            if (err) {
                return res_handler.sendError(err, 500, res, resource); 
            }
            
            else if (! result[0]) {
                return res_handler.sendSuccess(result, 204, res, resource); 
            }

            return res_handler.sendSuccess(result, 200, res, resource); 
        })
    }

    else if (when === 'before-meal') {
        sql = `SELECT id, _when, _value, _status FROM blood_sugar WHERE _when=? OR _when=? OR _when=?`; 
        
        db.query(sql, ['아침 식전', '점심 식전', '저녁 식전'], function (err, result) {
            if (err) {
                return res_handler.sendError(err, 500, res, resource); 
            }
            
            else if (! result[0]) {
                return res_handler.sendSuccess(result, 204, res, resource); 
            }

            return res_handler.sendSuccess(result, 200, res, resource); 
        })
    }

    else if (when === 'after-meal') {
        sql = 'SELECT id, _when, _value, _status FROM blood_sugar WHERE _when=? OR _when=? OR _when=?'; 

        db.query(sql, ['아침 식후', '점심 식후', '저녁 식후'], function (err, result) {
            if (err) {
                return res_handler.sendError(err, 500, res, resource); 
            }
            
            else if (! result[0]) {
                return res_handler.sendSuccess(result, 204, res, resource); 
            }

            return res_handler.sendSuccess(result, 200, res, resource); 
        })
    }
}
