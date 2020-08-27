const db = require("../data/db");
const lib = require('../library/blood_sugar_lib');
const res_handler = require('../library/status_handler');
const resource = "blood_sugar";
const moment = require('moment');
const url = require('url');

//=================================================================
// request URL:  /blood-sugar
//=================================================================

// register new data in the table 
exports.register = function (req, res) {
    let req_data = {
        today: req.body.today,
        _when: req.body.when,
        _value: req.body.value,
        _status: 0,
        memo: req.body.memo
    };
    let sql = `SELECT * FROM blood_sugar WHERE today=? AND _when=?`;

    db.query(sql, [req_data.today, req_data._when], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource);
        }

        else if (result[0]) {
            return res_handler.sendError(err, 409, res, resource);
        }

        // if it is not exist
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

        sql = `INSERT INTO blood_sugar SET ?`;
        db.query(sql, req_data, function (err, result) {
            if (err) {
                return res_handler.sendError(err, 500, res, "creating " + resource);
            }

            return res_handler.sendSuccess(result, 201, res, "creating " + resource);
        });

    })

}

// get all the data in the table 
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

// delete all the data in the table 
exports.delete_all = function (req, res) {
    let sql = `DELETE FROM blood_sugar`;
    db.query(sql, function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource);
        }

        return res_handler.sendSuccess(result, 204, res, "deleting " + resource);
    });
}



//=================================================================
// request URL:  /blood-sugar/id/:id 
//=================================================================

// get data from the table by using parameter /id/:id
exports.get_record_id = function (req, res) {
    let id = req.params.id;
    let sql = `SELECT * FROM blood_sugar WHERE id=?`;
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
    let now = moment();
    let req_data = {
        desc_etc: req.body.des_etc,
        _value: req.body.value,
        memo: req.body.memo,
        edited: now.format("YYYY-MM-DD HH:mm:ss")
    }

    let sql = `UPDATE blood_sugar SET ? WHERE id=?`;
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
    let sql = `DELETE FROM blood_sugar WHERE id=?`;
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource);
        }

        return res_handler.sendSuccess(result, 204, res, "delete");
    })
}


//=================================================================
// request URL:  /blood-sugar/record?today=?&when=?
//=================================================================

// get data from the table by using today and when
exports.get_record_today_when = function (req, res) {
    var queryData = url.parse(req.url, true).query;
    let today = queryData.today;
    let when = queryData.when;

    let sql = `SELECT * FROM blood_sugar WHERE today=? AND _when=?`;
    db.query(sql, [today, when], function (err, result) {
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
// request URL:  /blood-sugar/date?startDate=?&endDate=?
//=================================================================
// get data from the table which from startDate to endDate
exports.get_records_date = function (req, res) {
    var queryData = url.parse(req.url, true).query;
    let startDate = queryData.startDate;
    let endDate = queryData.endDate;

    let sql = `SELECT * FROM blood_sugar `
        + `WHERE today >='${startDate}' AND today <= '${endDate}' `
        + `ORDER BY today DESC`;

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


// **graph api **
//=================================================================
// request URL:  /blood-sugar/date/:today
//=================================================================

// get data from the table by using today value
exports.get_records_today = function (req, res) {
    let today = req.params.today;
    let sql = `SELECT * FROM blood_sugar WHERE today=? ORDER BY _when`;

    db.query(sql, [today], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, resource);
        }

        else if (!result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource);

        }

        return res_handler.sendSuccess(result, 200, res, resource);
    })
}


// **graph api **
//=================================================================
// request URL:  /blood-sugar/when/:when?startDate=?&endDate=?
//=================================================================
// get data from the table by using when value
exports.get_records_when = function (req, res) {
    let when = req.params.when;
    let queryData = url.parse(req.url, true).query;
    let startDate = queryData.startDate;
    let endDate = queryData.endDate;

    if (when === '전체') when = '식전';

    let sql = `SELECT id, today, _when, _value FROM blood_sugar `
        + `WHERE _when LIKE '%${when}' AND today >='${startDate}' AND today <='${endDate}' `
        + `ORDER BY today`;

    db.query(sql, function (err, rows) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource);
        }

        else if (!rows[0]) {
            return res_handler.sendSuccess(rows, 204, res, resource);
        }

        //데이터 가공하기
        let result = [];
        if (when === '식전' || when === '식후') {
            let id = 0;
            for (let i = 0; i < rows.length; i++) {
                let date = rows[i].today;
                let data = { id: id++, today: date };
                for (let j = i; j < rows.length; j++) {
                    let row = rows[j];
                    if (date === row.today) {
                        data[row._when] = row._value;
                    }
                    else {
                        i = j - 1;
                        break;
                    }
                }
                result.push(data);
            }

        }

        else {
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let data = { id: i, today: row.today };
                data[row._when] = row._value;
                result.push(data);
            }
        }

        return res_handler.sendSuccess(result, 200, res, resource);
    })
}
