const db = require("../data/db"); 

// possible error point 
exports.register = function (req, res) {
    let req_data = {
        _when: req.body.when,
        _time: req.body.time, 
        _date: req.body.date,
        _value: req.body.value,
        _status: 0, 
        memo: req.body.memo
    }
    
    // set etc additional description 
    if (req_data._when === 'etc') {
        req_data.desc_etc = req.body.desc_etc; 
    }

    // set status 
    if (req_data._value <= 70) {
        req_data._status = 1; 
    }
    else if (req_data._value >= 400) {
        req_data._status = 2; 
    }

    let sql = `INSERT INTO blood_sugar SET ?`; 
    db.query(sql, req_data, function (err, result) {
        if (err) {
            return res.status(500).send({
                msg: 'database ERROR - cannot register the new blood sugar', 
                success: false, 
                result: err
            })
        }

        sql = `SELECT id FROM blood_sugar WHERE _date=? AND _when=?`
        db.query(sql, [req_data._date, req_data._when], function (err2, result) {
            if (err2) {
                return res.status(500).send({
                    msg: 'database ERROR - cannot get id from blood_sugar table', 
                    success: false, 
                    result: err2
                })
            }

            // update day_blood_sugar data 
            let id = result[0].id; 
            let day_sql =''; 

            // day_blood_sugar 에서 date는 이미 생겼다고 가정 
            if (req_data._when === 'morning') {
                day_sql = `UPDATE day_blood_sugar SET morning_id=?, morning=? WHERE _date=?`; 

            } else if (req_data._when === 'before_breakfast') {
                day_sql = `UPDATE day_blood_sugar SET before_breakfast_id=?, before_breakfast=? WHERE _date=?`;

            } else if (req_data._when === 'after_breakfast') {
                day_sql = `UPDATE day_blood_sugar SET after_breakfast_id=?, after_breakfast=? WHERE _date=?`;
                
            } else if (req_data._when === 'before_lunch') {
                day_sql = `UPDATE day_blood_sugar SET before_lunch_id=?, before_lunch=? WHERE _date=?`;
                
            } else if (req_data._when === 'after_lunch') {
                day_sql = `UPDATE day_blood_sugar SET after_lunch_id=?, after_lunch=? WHERE _date=?`;
                
            } else if (req_data._when === 'before_dinner') {
                day_sql = `UPDATE day_blood_sugar SET before_dinner_id=?, before_dinner=? WHERE _date=?`;
                
            } else if (req_data._when === 'after_dinner') {
                day_sql = `UPDATE day_blood_sugar SET after_dinner_id=?, after_dinner=? WHERE _date=?`;
                
            } else if (req_data._when === 'night') {
                day_sql = `UPDATE day_blood_sugar SET night_id=?, night=? WHERE _date=?`;
                
            } else if (req_data._when === 'dawn') {
                day_sql = `UPDATE day_blood_sugar SET dawn_id=?, dawn=? WHERE _date=?`;
                
            } else {
                day_sql = `UPDATE day_blood_sugar SET etc_id=?, etc=? WHERE _date=?`;
            }

            db.query(day_sql, [id, req_data._value, req_data._date], function (err3, result) {
                if (err3) {
                    return res.status(500).send({
                        msg: 'database ERROR - cannot update day_blood_sugar table', 
                        success: false, 
                        result: err3
                    })
                }
            })

        })

        return res.status(200).send({
            msg: 'the new blood sugar data has been registered! ',
            success: true,  
            result: result
        })
    })
    
}


exports.get_all = function (req, res) {
    let sql = `SELECT * FROM blood_sugar`; 

    db.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send({
              msg: "database ERROR - while connecting to blood_sugar table",
              success: false, 
              result: err
            });
          }
      
          if (!result[0]) {
            return res.status(401).send({
              msg: "There is no data",
              success: false, 
              result: result
            });
          }
      
          return res.status(200).send({
            msg: "blood sugar data has been sent",
            success: true, 
            result: result
          });
        });
}

exports.delete_all = function (req, res) {
    let sql = `DELETE FROM blood_sugar`; 
    db.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send({
              msg: "database ERROR - while connecting to blood_sugar table",
              success: false, 
              result: err
            });
          }
      
          return res.status(200).send({
            msg: "blood sugar data has been deleted",
            success: true, 
            result: result
          });
        });
}

// possible error point 
exports.get_record = function (req, res) {
    let id = req.query.id; 
    let sql = `SELECT * FROM blood_sugar WEHRE id=?`; 
    db.query(sql, [id], function (err, result) {
        if (err) {
            return res.status(500).send({
              msg: "database ERROR - while connecting to blood_sugar table",
              success: false, 
              result: err
            });
        }
        
        if (! result[0]) {
            return res.status(401).send({
                msg: "there is no data with the id", 
                success: false, 
                result: result
            }); 
            
        }

        return res.status(200).send({
            msg: "blood sugar data has been sent",
            success: true, 
            result: result
        });
    });
}

// possible error point 
exports.update_record = function (req, res) {
    let id = req.query.id; 
    
    let req_data = {
        desc_etc: req.body.desc_etc, 
        _time: req.body.time,
        _value: req.body.value, 
        memo: req.body.memo
    }

    let get_data_sql = `SELECT _date, _when, desc_etc, _time, _value, memo FROM blood_sugar WHERE id=?`; 
    db.query(get_data_sql, [id], function (err, result) {
        if (err) {
            return res.status(500).send({
              msg: "database ERROR - while connecting to blood_sugar table",
              success: false, 
              result: err
            });
        }
        
        if (! result[0]) {
            return res.status(401).send({
                msg: "there is no data with the id", 
                success: false, 
                result: result
            }); 
            
        }

        let date = result[0]._date; 
        let when = result[0]._when; 

        // 수정되지 않은 데이터는 원래 데이터로 치환해줌 
        if (req_data.desc_etc === undefined) {
            req_data.desc_etc = result[0].desc_etc; 
        }

        if (req_data._time === undefined) {
            req_data._time = result[0]._time; 
        }

        if (req_data._value === undefined) {
            req_data._value = result[0]._value; 
        }

        if (req_data.memo === undefined) {
            req_data.memo = result[0].memo; 
        }

        let sql = `UPDATE blood_sugar SET desc_etc=?, _time=?, _value=?, memo=? WHERE id=?`; 
        db.query(sql, [req_data.desc_etc, req_data._time, req_data._value, req_data.memo, id], 
            function (err2, result) {
                if (err2) {
                    return res.status(500).send({
                      msg: "database ERROR - while inserting data into blood_sugar table",
                      success: false, 
                      result: err2
                    });
                }
                
                // update day_blood_sugar 에서 value 값 
                let day_sql = `UPDATE day_blood_sugar SET '` + when + `'=? WHERE _date=?`; 
                db.query(day_sql, [req_data._value, date], function (err3, result) {
                    if (err3, result) {
                        return res.stauts(500).send({
                            msg: "database ERROR - cannot update day_blood_sugar data", 
                            success: false, 
                            result: err3
                        })
                    }
                })
                return res.status(200).send({
                    msg: "the blood_sugar data has been updated", 
                    success: true, 
                    result: result
                }); 
        
            });
    });

}


