const db = require("../data/db"); 

exports.register = function (req, res) {
    let req_data = {
        _when: req.body.when,
        when_cnt: 1, 
        _time: req.body.time, 
        _date: req.body.date,
        _value: req.body.value,
        _status: 0, 
        memo: req.body.memo
    }
    
    // set etc additional description 
    if (req_data._when === 'etc') {
        req_data.when_etc = req.body.when_etc; 
    }

    // set status 
    if (req_data._value <= 70) {
        req_data._status = 1; 
    }
    else if (req_data._value >= 400) {
        req_data._status = 2; 
    }

    // set when_cnt
    let when_cnt_sql = `SELECT COUNT(*) AS count FROM blood_sugar WHERE _date=? AND _when=?`; 
    db.query(when_cnt_sql, [req_data._date, req_data._when], function (err, result) {
        if (err) {
            return res.status(500).send ({
                msg: 'database ERROR - while counting when_cnt', 
                success: false, 
                result: err
            })
        }

        req_data.when_cnt = result[0].count; 

        let sql = `INSERT INTO blood_sugar SET ?`; 
        db.query(sql, req_data, function (err, result) {
            if (err) {
                return res.status(500).send({
                    msg: 'database ERROR - cannot register the new blood sugar', 
                    success: false, 
                    result: err
                })
            }

            return res.status(200).send({
                msg: 'the new blood sugar data has been registered! ',
                success: true,  
                result: result
            })
        })
    })
}
