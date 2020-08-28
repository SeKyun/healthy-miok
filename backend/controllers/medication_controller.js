const db = require("../data/db");
const res_handler = require('../library/status_handler');
const resource = 'medication';
const moment = require('moment');
const url = require('url');

//=================================================================
// request URL:  /medication
//=================================================================

// register new data in the table 
exports.register = function (req, res) {
    let sql = `INSERT INTO ${resource} SET ?`; 
    let req_data = {
        kor_name: req.body.kor_name,
        today: req.body.today, 
        _time: req.body.time, 
        _when: req.body.when, 
        unit: req.body.unit, 
        memo: req.body.memo, 
        edited: moment().format('YYYY-MM-DD HH:mm:ss')
    }; 

    db.query(sql, req_data, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "creating " + resource); 
        }

        return res_handler.sendSuccess(result, 201, res, resource); 
    }); 

}

// get all the data in the table 
exports.get_all = function (req, res) {
    let sql = `SELECT * FROM ${resource} ORDER BY today DESC, _when ASC`;

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

// delete all the data in the table 
exports.delete_all = function (req, res) {
    let sql = `DELETE FROM ${resource}`;
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource);
        }

        return res_handler.sendSuccess(result, 204, res, "deleting " + resource);
    });
}



//=================================================================
// request URL:  /medication/id/:id 
//=================================================================

// get data from the table by using parameter /id/:id
exports.get_record_id = function (req, res) {
    let id = req.params.id;
    let sql = `SELECT * FROM ${resource} WHERE id=?`;
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource);
        }
        else if (!result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource);
        }
        return res_handler.sendSuccess(result, 200, res, resource);
    })
}

// update data in the table by using parameter /id/:id 
exports.update_record_id = function (req, res) {
    let id = req.params.id;
    let req_data = {
        kor_name: req.body.kor_name, 
        _time: req.body.time, 
        _when: req.body.when, 
        unit: req.body.unit, 
        memo: req.body.memo, 
        edited: moment().format('YYYY-MM-DD HH:mm:ss')
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
// request URL:  /medication/date/:today
//=================================================================

// get data from the table by using today
exports.get_record_today = function (req, res) {
    let today = req.params.today; 
    console.log(today); 
    let sql = `SELECT * FROM ${resource} WHERE today=? ORDER BY _when`;
    db.query(sql, [today], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource);
        }

        else if (!result[0]) {
            return res_handler.sendSuccess(result, 204, res, "getting " + resource);
        }

        return res_handler.sendSuccess(result, 200, res, "getting " + resource);
    })
}

//=================================================================
// request URL:  /medication/date?startDate=?&endDate=?
//=================================================================
// get data from the table which from startDate to endDate
exports.get_records_date = function (req, res) {
    var queryData = url.parse(req.url, true).query;
    let startDate = queryData.startDate;
    let endDate = queryData.endDate;

    let sql = `SELECT * FROM ${resource} `
        + `WHERE today >='${startDate}' AND today <= '${endDate}' `
        + `ORDER BY today DESC, _when ASC`;

    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource);
        }

        else if (!result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource);
        }

        return res_handler.sendSuccess(result, 200, res, resource);
    })
}


