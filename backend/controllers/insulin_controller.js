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
//possible error point 
exports.register = function (req, res) {
    let req_data = {
        today: req.body.today, 
        _when: req.body.when, 
        _time: req.body.time, 
        _type: req.body.type, 
        unit: req.body.unit, 
        memo: req.body.memo
    }; 
    let sql = `SELECT * FROM ${resource} WHERE today=? AND _when=?`; 

    db.query(sql, [req_data.today, req_data._when], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource); 
        }
        // 에러 말고 다른 응답..? 고민 
        else if (result[0]) {
            return res_handler.sendError(result[0], 409, res, resource); 
        }

        // 기타 설정 
        if (req_data._when === '/^(기타)') {
            req_data.desc_etc = req.body.desc_etc; 
        }

        // _time, _date 설정
        let now = moment(); 
        req_data._time = now.format("HH:mm:ss"); 
        req_data.edited = now.format('YYYY-MM-DD HH:mm:ss'); 
        sql = `INSERT INTO ${resource} SET ?`; 
        db.query(sql, req_data, function (err, result) {
            if (err) {
                return res_handler.sendError(err, 500, res, "creating " + resource); 
            }

            return res_handler.sendSuccess(result, 201, res, "creating " + resource); 
        });     

    });
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
    let sql = `DELETE FROM ${resource}`; 
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource); 
        }

        return res_handler.sendSuccess(result, 204, res, "deleting " + resource); 
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
            return res_handler.sendError(err, 500, res, resource); 
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
    let now = moment(); 
    let req_data = {
        desc_etc: req.body.des_etc,
        _type: req.body.type, 
        unit: req.body.unit, 
        memo: req.body.memo,
        edited: now.format("YYYY-MM-DD HH:mm:ss")
    }

    let sql = `UPDATE ${resource} SET ? WHERE id=?`; 
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
        
        return res_handler.sendSuccess(result, 204, res, "delete"); 
    })
}


//=================================================================
// requre URL:  /insulin/record?today=?&when=?
//=================================================================

// get data from the table by using today and when
exports.get_record_today_when = function (req, res) {
    var queryData = url.parse(req.url, true).query; 
    let today = queryData.today; 
    let when = queryData.when; 

    console.log("queryData: ", queryData); 

    let sql = `SELECT * FROM ${resource} WHERE today=? AND _when=?`; 
    db.query(sql, [today, when], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }
        console.log(result[0]); 
        
        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, "getting " + resource); 
        }

        return res_handler.sendSuccess(result, 200, res, "getting " + resource); 
    })
}

//=================================================================
// requre URL:  /insulin/date?startDate=?&endDate=?
//=================================================================
// get data from the table which from startDate to endDate
exports.get_records_date = function (req, res) {
    var queryData = url.parse(req.url, true).query; 
    let startDate = queryData.startDate; 
    let endDate = queryData.endDate; 

    console.log("queryData: ", queryData); 

    let sql = `SELECT id, today, _when, _time, _type, unit FROM ${resource} `
            + `WHERE today >='${startDate}' AND today <= '${endDate}' `
            + `ORDER BY today DESC`; 

    console.log("sql: ", sql); 

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
            return res_handler.sendError(err, 500, res, resource); 
        }
        
        else if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
            
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}


// **graph api **
//=================================================================
// requre URL:  /insulin/when/:when
//=================================================================
//possible error point 
// get data from the table by using when value
exports.get_records_when = function (req, res) {
    let when = req.params.when; 
    let sql = `SELECT id, today, _when, _time, _type, unit FROM ${resource} WHERE _when LIKE '%${when}'`;

    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource); 
        }

        else if(! result[0]) {
            return res_handler.sendSuccess(result, 204, res, "getting " + resource);  
        }

        return res_handler.sendSuccess(result, 200, res, "getting " + resource); 
    })
}


