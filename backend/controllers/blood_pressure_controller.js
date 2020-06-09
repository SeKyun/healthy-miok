const db = require("../data/db"); 
const lib = require('../library/blood_pressure_lib'); 
const res_handler = require('../library/status_handler'); 
const resource = "blood_pressure"; 
const moment = require('moment'); 
const url = require('url'); 


//=================================================================
// requre URL:  /blood-pressure
//=================================================================
// register new data in the table
//possible error point 
exports.register = function (req, res) {
    let req_data = {
        today: req.body.today, 
        _time: req.body.time, 
        value_high: req.body.value_high, 
        value_low: req.body.value_low, 
        value_bpm: req.body.value_bpm, 
        memo: req.body.memo
    }; 

    if (! req_data.memo) {
        req_data.memo = null; 
    }

    let sql = `INSERT INTO ${resource} SET ?`; 
    db.query(sql, req_data, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "creating " + resource); 
        }

        return res_handler.sendSuccess(result, 201, res, "creating " + resource); 
    })
}

// get all the data in the table 
exports.get_all = function (req, res) {
    let sql = `SELECT * FROM ${resource} ORDER BY today DESC`; 

    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, "getting " + res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, "getting " + resource); 
    });  
}

// delete all the data in the table 
exports.delete_all = function (req, res) {
    let sql = `DELETE FROM blood_pressure`; 
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource); 
        }

        return res_handler.sendSuccess(result, 204, res, "deleting " + resource); 
    })
}


//=================================================================
// requre URL:  /blood-pressure/id/:id 
//=================================================================
// get data from the table by using parameter /id/:id
//possible error point 
exports.get_record_id = function (req, res) {
    let id = req.parmas.id; 
    let sql = `SELECT * FROM ${resource} WHERE id=?`; 
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    }); 
}

// update data in the table by using parameter /id/:id 
exports.update_record_id = function (req, res) {
    let id = req.params.id; 
    let now = moment(); 
    let req_data = {
        _time: req.body.value_time,
        value_high: req.body.value_high, 
        value_low: req.body.value_low, 
        value_bpm: req.body.value_bpm, 
        memo: req.body.memo, 
        edited: now.format("YYYY-MM-DD HH:mm:ss")
    }

    let sql =  `UPDATE ${resource} SET ? WHERE id=?`; 
    db.query(sql, [req_data, id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        return res_handler.sendSuccess(result, 204, res, "update"); 
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

        return res_handler.sendSuccess(result, 204, res, "delete "); 
    })
}

//=================================================================
// requre URL:  /blood-pressure/date?startDate=?&endDate=?
//=================================================================
// get data from the table which from startDate to endDate
exports.get_records_date = function (req, res) {
    let queryData = url.parse(req.url, true).query; 
    let startDate = queryData.startDate; 
    let endDate = queryData.endDate; 

    console.log("queryData: ", queryData); 

    let sql = `SELECT id, today, value_high, value_low, value_bpm FROM ${resource} ` + 
              `WHERE today >= '${startDate}' AND today <= '${endDate}' ` + 
              `ORDER BY today DESC`; 
    
    db.query(sql, function (err, rows) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (! rows[0]) {
            return res_handler.sendSuccess(rows, 204, res, resource); 
        }
        sql = `SELECT * FROM avg_blood_pressure WHERE _date >= '${startDate}' AND _date <= '${endDate}' ` +
              `ORDER BY _date DESC`; 

        db.query(sql, function (err2, avgs) {

            if (err2) {
                return res_handler.sendError(err2, 500, res, "avg_blood_pressure"); 
            }

            else if (!avgs[0]) {
                return res_handler.sendSuccess(avgs, 204, res, "avg_blood_pressure"); 
            }

            // 데이터 가공하기 ! 
            let result = []; 
            let date_idx = 0; 
            for(let i = 0; i < avgs.length; i++) {
                let avg = avgs[i]; 
                let today = avg._date;
                console.log("today: ", today); 
                let res_data = {
                    today: today, 
                    record: [], 
                    average: {
                        high: avg.avg_high, 
                        low: avg.avg_low, 
                        bpm: avg.avg_bpm
                    }, 
                    status: lib.setBloodPressureStatus(avg.avg_high, avg.avg_low, avg.avg_bpm)
                }; 
                for(let j = date_idx; j < rows.length; j++) {
                    let row = rows[j];
                    console.log("row!!! ", row); 

                    if (row.today === today) {
                        let data = {
                            id: row.id, 
                            value_high: row.value_high, 
                            value_low: row.value_low, 
                            value_bpm: row.value_bpm
                        }
                        res_data.record.push(data); 
                        console.log("if row.today=== today: ", res_data.record); 
                    }

                    else {
                        date_idx = j; 
                        console.log("else: ", res_data.record); 
                        console.log("date_idx: ", date_idx); 
                    }
                }

                result.push(res_data); 
            }
            
            return res_handler.sendSuccess(result, 200, res, resource); 
        })
    })
}


// ** detail page api **
//=================================================================
// requre URL:  /blood-pressure/date/:today
//=================================================================
// get data from the table by using today value
exports.get_record_today = function (req, res) {
    let today = req.parmas.today; 
    let sql = `SELECT * FROM ${resource} WHERE today=? ORDER BY _time`; 

    db.query(sql, [today], function (err, rows) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (! rows[0]) {
            return res_handler.sendSuccess(rows, 204, res, resource); 
        }
        sql = `SELECT * FROM avg_blood_pressure WHERE _date=?`; 

        db.query(sql, [today], function (err2, avgs) {
            if (err2) {
                return res_handler.sendError(err2, 500, res, "avg_blood_pressure"); 
            }

            else if (!avgs[0]) {
                return res_handler.sendSuccess(avgs, 204, res, "avg_blood_pressure"); 
            }
            let avg = avgs[0]; 
            // 데이터 가공하기 ! 
            let result = {
                today: today, 
                record: [],
                avg: {
                    high: avg.avg_high, 
                    low: avg.avg_low, 
                    bpm: avg.avg_bpm
                }, 
                status: lib.setBloodPressureStatus(avg.avg_high, avg.avg_low, avg.avg_bpm) 
            };  
            
            for(let i = 0; i < rows.length; i++) {
                result.record.push(rows[i]); 
            }
            
            return res_handler.sendSuccess(result, 200, res, resource); 
        })
    })
}

// ** record page & graph api **
//================================================================
// requre URL:  /blood-pressure/statistics?startDate=?&endDate=?
//================================================================
// get average and status data derived from the table which from startDate to endDate
//possible error point 
// exports.get_statistics_date = function (req, res) {
//     let queryData = url.parse(req.url, true).query; 
//     let startDate = queryData.startDate; 
//     let endDate = queryData.endDate; 

//     console.log("queryData: ", queryData); 

//     let sql = `SELECT * FROM avg_blood_pressure ` +
//               `WHERE _date >= '${startDate}' AND _date <= '${endDate}' ` +
//               `ORDER BY _date DESC`; 

//     db.query(sql, function (err, result) {
//         if (err) {
//             return res_handler.sendError(err, 500, res, resource); 
//         }

//         if (! result[0]) {
//             return res_handler.sendSuccess(result, 204, res, resource); 
//         }

//         for (let i = 0; i < result.length; i++) {
//             let _status = lib.setBloodPressureStatus(result[i].avg_high, result[i].avg_low);         
//             result[i]._status = _status; 
//         }

//         return res_handler.sendSuccess(result, 200, res, resource); 
//     })
// }

// ** record page api **
//================================================================
// requre URL:  /blood-pressure/statistics/:today
//================================================================
// get average and status data derived from the table by using today value
//possible error point 
// exports.get_statistics_today = function (req, res) {
//     let today = req.params.today; 
//     let sql = `SELECT * FROM avg_blood_pressure WHERE _date=?`; 

//     db.query(sql, [today], function (err, result) {
//         if (err) {
//             return res_handler.sendError(err, 500, res, "getting average of" + resource); 
//         }

//         if (! result[0]) {
//             return res_handler.sendSuccess(result, 204, res, "getting average of" + resource); 
//         }

//         let _status = lib.setBloodPressureStatus(result[0].avg_high, result[0].avg_low);         
//         result[0]._status = _status; 

//         return res_handler.sendSuccess(result, 200, res, "getting average of" + resource); 
//     })
    
// }


// exports.get_status_date = function (req, res) {
//     let queryData = url.parse(req.url, true).query; 
//     let startDate = queryData.startDate; 
//     let endDate = queryData.endDate; 

//     let sql = `SELECT * FROM avg_blood_pressure ` +
//               `WHERE _date >= '${startDate}' AND _date <= '${endDate}' ` +
//               `ORDER BY _date DESC`; 
    
    
//     db.query(sql, function (err, rows) {
//         if (err) {
//             return res_handler.sendError(err, 500, res, resource); 
//         }

//         if (! rows[0]) {
//             return res_handler.sendSuccess(rows, 204, res, resource); 
//         }

//         let result = []; 
//         for (row in rows) {
//             let avg_high = row.avg_high; 
//             let avg_low = row.avg_low;  
//             let _status = lib.setBloodPressureStatus(avg_high, avg_low); 

//             result.push({_date: row._date, _status: _status }); 
//         }

//         return res_handler.sendSuccess(result, 200, res, resource); 
//     }); 
// }
