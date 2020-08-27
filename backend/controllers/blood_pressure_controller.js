const db = require("../data/db"); 
const res_handler = require('../library/status_handler'); 
const resource = "blood_pressure"; 
const moment = require('moment'); 


//=================================================================
// request URL:  /blood-pressure
//=================================================================
// register new data in the table
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

        return res_handler.sendSuccess(result, 201, res, resource); 
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
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    });  
}

// delete all the data in the table 
exports.delete_all = function (req, res) {
    let sql = `DELETE FROM blood_pressure`; 
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource); 
        }

        return res_handler.sendSuccess(result, 204, res, resource); 
    })
}


//=================================================================
// request URL:  /blood-pressure/id/:id 
//=================================================================
// get data from the table by using parameter /id/:id

exports.get_record_id = function (req, res) {
    let id = req.parmas.id; 
    let sql = `SELECT * FROM ${resource} WHERE id=?`; 
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res,  "getting" + resource); 
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
            return res_handler.sendError(err, 500, res, "deleting " + resource); 
        }

        return res_handler.sendSuccess(result, 204, res, resource); 
    })
}

//=================================================================
// request URL:  /blood-pressure/date?startDate=?&endDate=?
//=================================================================
// get data from the table which from startDate to endDate
exports.get_records_date = function (req, res) {
    let queryData = req.query; 
    let startDate = queryData.startDate; 
    let endDate = queryData.endDate

    let sql = `SELECT id, today, value_high, value_low, value_bpm FROM ${resource} ` + 
              `WHERE today >= '${startDate}' AND today <= '${endDate}' ` + 
              `ORDER BY today DESC`; 
    
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (!result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        res_handler.sendSuccess(result, 200, res, resource); 
    })
}


// ** detail page api **
//=================================================================
// request URL:  /blood-pressure/date/:today
//=================================================================
// get data from the table by using today value
exports.get_records_today = function (req, res) {
    let today = req.params.today;
    console.log(today); 

    let sql = `SELECT * FROM ${resource} WHERE today=? ORDER BY _time`; 
    db.query(sql, [today], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }

        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }
       
            return res_handler.sendSuccess(result, 200, res, resource); 
        })
}

// ** graph page api **
//=================================================================
// request URL:  /blood-pressure/graph?startDate=?&endDate=?
//=================================================================
// get data from the table by using today value
exports.get_records_graph = function (req, res) {
    let queryData = req.query; 
    let startDate = queryData.startDate; 
    let endDate = queryData.endDate; 

    console.log("body: ", req.body); 
    let req_data = {
        high: req.body.high, 
        low: req.body.low, 
        bpm: req.body.bpm
    }

    let sql = `SELECT today, value_high, value_low, value_bpm `
            + `FROM ${resource} ` 
            + `WHERE today >= '${startDate}' AND today <= '${endDate}' `
            + `ORDER BY today`; 

    db.query(sql, function(err, rows) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }

        if (! rows[0]) {
            return res_handler.sendSuccess(rows, 204, res, resource); 
        }
        
        //데이터 가공
        let result = []; 
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i]; 
            let data = { id: i, today: row.today }; 
            if (req_data.high === true) {
                data['high'] = row.value_high; 
            }
            if (req_data.low === true) {
                data['low'] = row.value_low; 
            }
            if (req_data.bpm === true) {
                data['bpm'] = row.value_bpm; 
            }
            result.push(data); 
        }
            return res_handler.sendSuccess(result, 200, res, resource); 
        })

}