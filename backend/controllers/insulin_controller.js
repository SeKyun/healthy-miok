const db = require("../data/db"); 
// const lib = require('../library/blood_pressure_lib'); 
const res_handler = require('../library/status_handler'); 
const resource = "insulin"; 
const moment = require('moment'); 
const url = require('url'); 


//=================================================================
// requre URL:  /insulin
//=================================================================
// register new data in the table
exports.register = function (req, res) {
    let now = moment().format("YYYY-MM-DD HH:mm:ss"); 
    let req_data = {
        today: req.body.today, 
        _when: req.body.when, 
        _time: req.body.time, 
        _name: req.body.name, 
        _type: req.body.type, 
        unit: req.body.unit, 
        memo: req.body.memo
    }; 

    let sql = ""; 
    if (req_data._type === '지속성') {
        sql = `SELECT * FROM ${resource} WHERE today=? AND _type='지속성'`;

        db.query(sql, [req_data.today], function (error, row) {
            if (error) {
                return res_handler.sendError(error, 500, res, "getting " + resource); 
            }

            else if (row[0]) {
                return res_handler.sendError(row[0], 409, res, resource); 
            }

            // 기타 설정 
            if (req_data._when === '기타1' || req_data._when === '기타2') {
                req_data.desc_etc = req.body.desc_etc; 
            }
    
            // _date 설정
            req_data.edited = now; 
            sql = `INSERT INTO ${resource} SET ?`; 
            db.query(sql, req_data, function (err, result) {
                if (err) {
                    return res_handler.sendError(err, 500, res, "creating " + resource); 
                }
    
                return res_handler.sendSuccess(result, 201, res, resource); 
            });     
    
        });
    } // 지속성 등록 끝
    else {
        sql = `SELECT * FROM ${resource} WHERE today=? AND _type='속효성' AND _when=?`; 
        db.query(sql, [req_data.today, req_data._when], function (err, result) {
            if (err) {
                return res_handler.sendError(err, 500, res, "getting " + resource); 
            }

            else if (result[0]) {
                return res_handler.sendError(result[0], 409, res, resource); 
            }
    
            // 기타 설정 
            if (req_data._when === '기타1' || req_data._when === '기타2') {
                req_data.desc_etc = req.body.desc_etc; 
            }
    
            //_date 설정
            req_data.edited = now; 
            sql = `INSERT INTO ${resource} SET ?`; 
            db.query(sql, req_data, function (err, result) {
                if (err) {
                    return res_handler.sendError(err, 500, res, "creating " + resource); 
                }
    
                return res_handler.sendSuccess(result, 201, res, resource); 
            });     
    
        });
    } // 속효성 등록 끝
}

// get all the data in the table 
exports.get_all = function (req, res) {
    let sql = `SELECT * FROM ${resource} ORDER BY today DESC`; 

    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    });  
}

// delete all the data in the table 
exports.delete_all = function (req, res) {
    let sql = `DELETE FROM ${resource}`; 
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource); 
        }

        return res_handler.sendSuccess(result, 204, res, resource); 
    })
}


//=================================================================
// requre URL:  /insulin/id/:id 
//=================================================================

// get data from the table by using parameter /id/:id
exports.get_record_id = function (req, res) {
    let id = req.params.id; 
    let sql = `SELECT * FROM ${resource} WHERE id=?`; 
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }
        else if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }
        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}
// update data in the table by using parameter /id/:id 
exports.update_record_id = function (req, res) {
    let id = req.params.id; 
    let now = moment().format("YYYY-MM-DD HH:mm:ss"); 
    let type = req.body.type; 

    let req_data = {
        desc_etc: req.body.desc_etc, 
        _time: req.body.time,
        _name: req.body.name, 
        unit: req.body.unit, 
        memo: req.body.memo,
        edited: now
    }
    let sql = `UPDATE ${resource} SET ? WHERE id=?`; 
    if (type === '지속성') {
        req_data._when = req.body.when;
    }
    db.query(sql, [req_data, id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "updating " + resource); 
        }
        return res_handler.sendSuccess(result, 204, res, resource); 
    })
}
// delete data in the table by using parameter /id/:id
exports.delete_record_id = function (req, res) {
    let id = req.params.id; 
    let sql = `DELETE FROM ${resource} WHERE id=?`; 
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }
        
        return res_handler.sendSuccess(result, 204, res, "delete"); 
    })
}


//=================================================================
// requre URL:  /insulin/record/short?today=?&when=?
//=================================================================

// get data from the table by using today and when
exports.get_record_short = function (req, res) {
    let queryData = url.parse(req.url, true).query; 
    let today = queryData.today; 
    let when = queryData.when; 

    let sql = `SELECT * FROM ${resource} WHERE today=? AND _type='속효성' AND _when=?`; 

    db.query(sql, [today, when], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }
        console.log(result[0]); 
        
        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}

//=================================================================
// requre URL:  /insulin/record/long?today=?
//=================================================================
exports.get_record_long = function (req, res) {
    let queryData = url.parse(req.url, true).query; 
    let today = queryData.today; 
    
    let sql = `SELECT * FROM ${resource} WHERE today=? AND _type='지속성'`; 

    db.query(sql, [today], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })

}


//=================================================================
// requre URL:  /insulin/date?startDate=?&endDate=?
//=================================================================
// get data from the table which from startDate to endDate
exports.get_records_date = function (req, res) {
    var queryData = url.parse(req.url, true).query; 
    let startDate = moment(queryData.startDate).format('YYYY-MM-DD'); 
    let endDate = moment(queryData.endDate).format('YYYY-MM-DD'); 

    console.log("queryData: ", queryData); 

    let sql = `SELECT id, today, _when, _time, _name, _type, unit FROM ${resource} `
            + `WHERE today >='${startDate}' AND today <= '${endDate}' `
            + `ORDER BY today DESC`; 

    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }

        else if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}


// **graph api **
//=================================================================
// requre URL:  /insulin/date/:today
//=================================================================

// get data from the table by using today value
exports.get_records_today = function (req, res) {
    let today = req.params.today; 
    let sql = `SELECT * FROM ${resource} WHERE today=? ORDER BY _when`; 

    db.query(sql, [today], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }
        
        else if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
            
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}


// **graph api **
//=================================================================
// requre URL:  /insulin/graph
//=================================================================
// get data from the table by using when value
exports.get_records_graph = function (req, res) {
    let dates = req.body.dates; // 배열
    let graph_cnt = req.body.cnt; // 몇개의 그래프 인지 
    let arr = []; 
    let sql1; 
    let sql2; 

    switch(graph_cnt) {
        case 1:
            sql1 = `SELECT today, _when, _value FROM blood_sugar WHERE today='${dates[0]}' ORDER BY today DESC`;
            sql2 = `SELECT today, _when, _type, unit, _time, desc_etc FROM ${resource} WHERE today='${dates[0]}' ORDER BY today DESC`;
            arr.push(dates[0]); 
            break; 
        case 2:
            sql1 = `SELECT today, _when, _value FROM blood_sugar WHERE today='${dates[0]}' OR today='${dates[1]}' ORDER BY today DESC`;
            sql2 = `SELECT today, _when, _type, unit, _time, desc_etc FROM ${resource} WHERE today='${dates[0]}' OR today='${dates[1]}' ORDER BY today DESC`;
            arr.push(dates[0]); 
            arr.push(dates[1]); 
            break; 
        case 3:
            sql1 = `SELECT today, _when, _value FROM blood_sugar WHERE today='${dates[0]}' OR today='${dates[1]}' OR today='${dates[2]}' ORDER BY today DESC`; 
            sql2 = `SELECT today, _when, _type, unit, _time, desc_etc FROM ${resource} WHERE today='${dates[0]}' OR today='${dates[1]}' OR today='${dates[2]}' ORDER BY today DESC`;
            arr.push(dates[0]); 
            arr.push(dates[1]); 
            arr.push(dates[2]); 
            break; 
        case 4:
            sql1 = `SELECT today, _when, _value FROM blood_sugar WHERE today='${dates[0]}' OR today='${dates[1]}' OR today='${dates[2]}' OR today='${dates[3]}' ORDER BY today DESC`;  
            sql2 = `SELECT today, _when, _type, unit, _time, desc_etc FROM ${resource} WHERE today='${dates[0]}' OR today='${dates[1]}' OR today='${dates[2]}' OR today='${dates[3]}' ORDER BY today DESC`;
            arr.push(dates[0]); 
            arr.push(dates[1]); 
            arr.push(dates[2]); 
            arr.push(dates[3]); 
            break; 
    }
    arr.sort(); 
    arr.reverse(); 

    let result = []; 
    for(let i = 0; i < arr.length; i++) {
        result.push({id: i, today: arr[i], data: [
            { when: '기상 직후'}, 
            { when: '아침 식전' },
            { when: '아침 식후' }, 
            { when: '점심 식전' }, 
            { when: '점심 식후' },
            { when: '저녁 식전' }, 
            { when: '저녁 직후' },
            { when: '취침 전' }, 
            { when: '새벽' }, 
            { when: '기타' },
            { when: '기타1' }, 
            { when: '기타2' }, 
        ]}); 
    }
    let when_dic = {
        '기상 직후': 0,
        '아침 식전': 1,
        '아침 식후': 2, 
        '점심 식전': 3, 
        '점심 식후': 4, 
        '저녁 식전': 5, 
        '저녁 식후': 6, 
        '취침 전': 7, 
        '새벽': 8, 
        '기타': 9, 
        '기타1': 10, 
        '기타2': 11
    };

    // 혈당
    db.query(sql1, function(err1, rows1) {
        if (err1) {
            return res_handler.sendError(err1, 500, res, "blood_sugar"); 
        }
        console.log("rows1 today: ", rows1); 
        console.log("len****:", Object.keys(rows1).length); 
        // 인슐린
        db.query(sql2, function(err2, rows2) {
            if (err2) {
                return res_handler.sendError(err2, 500, res, "insulin"); 
            }


            // console.log("rows2:", rows2[0]); 
            let cnt1 = 0; 
            let cnt2 = 0; 
            for(let i = 0; i < result.length; i++) {
                let date = result[i].today; 
                while( cnt1 < Object.keys(rows1).length && rows1[cnt1].today === date) {
                    let row = rows1[cnt1]; 
                    result[i]['data'][when_dic[row._when]]['blood_sugar'] = row._value; 
                    console.log("*****cnt1:", cnt1); 
                    cnt1 ++; 
                }
                while(cnt2 < Object.keys(rows2).length && rows2[cnt2].today === date) {
                    let row = rows2[cnt2]; 
                    if (row._type === '지속성')
                        result[i]['data'][when_dic['아침 식전']]['long'] = row.unit; 
                    else {
                        result[i]['data'][when_dic[row._when]]['short'] = row.unit; 
                    }
                    cnt2 ++; 
                }
            }

            console.log("result: ", result); 
            return res_handler.sendSuccess(result, 200, res, "blood_sugar & insulin"); 
        })
    })

}


