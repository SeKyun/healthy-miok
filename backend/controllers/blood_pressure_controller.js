const db = require("../data/db"); 
const lib = require('../library/blood_pressure_lib'); 
const res_handler = require('../library/status_handler'); 
const resource = "blood_pressure"; 
const moment = require('moment'); 
const url = require('url'); 

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
exports.get_all = function (req, res) {
    let sql = `SELECT * FROM blood_pressure ORDER BY today DESC`; 

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
exports.delete_all = function (req, res) {
    let sql = `DELETE FROM blood_pressure`; 
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource); 
        }

        return res_handler.sendSuccess(result, 204, res, "deleting " + resource); 
    })
}

//possible error point 
exports.get_record_id = function (req, res) {
    let id = req.parmas.id; 
    let sql = `SELECT * FROM ${resource} WHERE id=?`; 
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resouce); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    }); 
}
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

    let sql =  `UPDATE blood_sugar SET ? WHERE id=?`; 
    db.query(sql, [req_data, id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        return res_handler.sendSuccess(result, 204, res, "update"); 
    }) 
}
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



exports.get_records_date = function (req, res) {
    let queryData = url.parse(req.url, true).query; 
    let startDate = queryData.startDate; 
    let endDate = queryData.endDate; 

    console.log("queryData: ", queryData); 

    let sql = `SELECT * FROM ${resource} ` + 
              `WHERE today >= '${startDate}' AND today <= '${endDate}' ` + 
              `ORDER BY today DESC`; 
    
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}

exports.get_record_today = function (req, res) {
    let today = req.parmas.today; 
    let sql = `SELECT * FROM ${resource} WHERE today=? ORDER BY _time`; 

    db.query(sql, [today], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }
        sql = `SELECT * FROM avg_blood_pressure WHERE _date=?`;
        
        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }
        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}
exports.get_average_date = function (req, res) {
    let queryData = url.parse(req.url, true).query; 
    let startDate = queryData.startDate; 
    let endDate = queryData.endDate; 

    console.log("queryData: ", queryData); 

    let sql = `SELECT * FROM avg_blood_pressure ` +
              `WHERE _date >= '${startDate}' AND _date <= '${endDate}' ` +
              `ORDER BY _date DESC`; 

    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}
exports.get_average_today = function (req, res) {
    let today = req.params.today; 
    let sql = `SELECT * FROM avg_blood_pressure WHERE _date=?`; 

    db.query(sql, [today], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting average of" + resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, "getting average of" + resource); 
        }

        return res_handler.sendSuccess(result, 200, res, "getting average of" + resource); 
    })
    
}
exports.get_status_date = function (req, res) {
    let queryData = url.parse(req.url, true).query; 
    let startDate = queryData.startDate; 
    let endDate = queryData.endDate; 

    let sql = `SELECT * FROM avg_blood_pressure ` +
              `WHERE _date >= '${startDate}' AND _date <= '${endDate}' ` +
              `ORDER BY _date DESC`; 
    
    
    db.query(sql, function (err, rows) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (! rows[0]) {
            return res_handler.sendSuccess(rows, 204, res, resource); 
        }

        let result = []; 
        for (row in rows) {
            let avg_high = row.avg_high; 
            let avg_low = row.avg_low;  
            let _status = lib.setBloodPressureStatus(avg_high, avg_low); 

            result.push({_date: row._date, _status: _status }); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    }); 
}
