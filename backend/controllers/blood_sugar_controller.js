const db = require("../data/db"); 
const lib = require('../library/blood_sugar_lib'); 

// possible error point 
exports.register = function (req, res) {
    let req_data = {
        today: req.body.today, 
        _when: req.body.when, 
        _time: req.body.time, 
        _date: req.body.date, 
        _value: req.body.value,
        _status: 0,
        memo: req.body.memo 
    }; 

    console.log(req_data); 

    // status 설정
    req_data._status = lib.setBloodSugarStatus(req_data._value, req_data._when); 

    // 기타 설정 
    if (req_data._when === '기타') {
        req_data.desc_etc = req.body.desc_etc; 
    }

    let sql = `INSERT INTO blood_sugar SET ?`; 
    db.query(sql, req_data, function (err, result) {
        if (err) {
            return res.status(500).send ({
                msg: "database ERROR - cannot create new blood_sugar data", 
                success: false,
                result: err
            }); 
        }

        return res.status(201).send ({
            msg: "new blood_sugar data has been created", 
            success: true, 
            result: result
        }); 
    });     
}

exports.get_all = function (req, res) {
    let sql = `SELECT * FROM blood_sugar ORDER BY today DESC`; 

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

// // possible error point 
// exports.get_record = function (req, res) {
//     let id = req.query.id; 
//     let sql = `SELECT * FROM blood_sugar WHERE id=?`; 
//     db.query(sql, [id], function (err, result) {
//         if (err) {
//             return res.status(500).send({
//               msg: "database ERROR - while connecting to blood_sugar table",
//               success: false, 
//               result: err
//             });
//         }
        
//         if (! result[0]) {
//             return res.status(401).send({
//                 msg: "there is no data with the id", 
//                 success: false, 
//                 result: result
//             }); 
            
//         }

//         return res.status(200).send({
//             msg: "blood sugar data has been sent",
//             success: true, 
//             result: result
//         });
//     });
// }

// get info by using today and when
// *** possible error point ***
exports.get_record_today_when = function (req, res) {
    let today = req.query.today; 
    let when = req.query.when; 

    let sql = `SELECT * FROM blood_sugar WHERE _today=? AND _when=?`; 
    db.query(sql, [today, when], function (err, result) {
        if (err) {
            return res.status(500).send({
                msg: "database ERROR - while connecting to blood_sugar table",
                success: false, 
                result: err
              });
        }

        else if (! result[0]) {
            return res.status(401).send({
                msg: "there is no data with the date and when value", 
                success: false, 
                result: result
            }); 
        }

        return res.status(200).send({
            msg: "blood sugar data has been sent",
            success: true, 
            result: result
        });
    })
}

/** 
 * - today, _when 은 바꿀 수 없음
 * status _value 에 맞게 다시 계산
 */
// exports.update_record = function (req, res) {
//     let id = req.query.id; 
    
//     let req_data = {
//         _time: req.body.time, 
//         _date: req.body.date, 
//         _value: req.body.value, 
//         memo: req.body.memo, 
//     }
    
//     let sql = `SELECT _when, desc_etc FROM blood_sugar WHERE id=?`; 
//     db.query(sql, [id], function (err, result) {
//         if (err) {
//             res.status(500).send({
//                 msg: "database ERROR - while connecting to blood_sugar table",
//                 success: false, 
//                 result: err
//             })
//         }

//         else if (! result[0]) {
//             res.status(401).send({
//                 msg: "There is no blood_sugar data with the id", 
//                 success: false, 
//                 result: result[0]
//             })
//         }

//         // update table 
//         else {
            
//             let when = result[0]._when; 
//             let status = lib.setBloodSugarStatus(when, req_data._value); 

//             if (when === '기타') {
//                 req_data.desc_etc = req.body.desc_etc; 
//                 sql = `UPDATE blood_sugar SET desc_etc=? _time=? _date=? _value=? _status=? memo=? WHERE id=?`;
//                 db.query(sql, [req_data.desc_etc, req_data._time, req_data._date, req_data._value, status, req_data.memo, id], 
//                     function (err2, result2) {
//                         if (err2) {
//                             res.status(500).send({
//                                 msg: "database ERROR - while connecting to blood_sugar table",
//                                 success: false, 
//                                 result: err
//                             })
//                         }

//                         res.status(201).send({
//                             msg: "the blood_sugar data has been updated", 
//                             success: true, 
//                             result: result2
//                         })
//                     }) 
//             }

//             else {
//                 sql = `UPDATE blood_sugar SET _time=? _date=? _value=? status=? memo=? WHERE id=?`; 
//                 db.query(sql, [req_data._time, req_data._date, req_data._value, status, req_data.memo, id], 
//                     function (err2, result2) {
//                         if (err2) {
//                             res.status(500).send({
//                                 msg: "database ERROR - while connecting to blood_sugar table",
//                                 success: false, 
//                                 result: err
//                             })
//                         }

//                         res.status(201).send({
//                             msg: "the blood_sugar data has been updated", 
//                             success: true, 
//                             result: result2
//                         })
//                     })
//                 }
//         }
//     }) 
// }

// exports.delete_record = function (req, res) {
//     let id = req.query.id;
    
//     let sql = `DELETE FROM blood_sugar WHERE id=?`; 
//     db.query(sql, [id], function (err, result) {
//         if (err) {
//             return res.status(500).send({
//               msg: "database ERROR - while connecting to blood_sugar table",
//               success: false, 
//               result: err
//             });
//           }
      
//           return res.status(200).send({
//             msg: "blood sugar data has been deleted",
//             success: true, 
//             result: result
//           });
//         });
// }

//데이터 형식 알려줘야함. ! 
exports.get_records_date = function (req, res) {
    let req_data = {
        today: req.params.today
    }

    let sql = `SELECT * FROM blood_sugar WHERE today=?`; 
    db.query(sql, [req_data.today], function (err, result) {
        if (err) {
            return res.status(500).send({
              msg: "database ERROR - while connecting to blood_sugar table",
              success: false, 
              result: err
            });
        }
        
        else if (! result[0]) {
            return res.status(401).send({
                msg: "there is no data with the date", 
                success: false, 
                result: result
            }); 
            
        }

        return res.status(200).send({
            msg: "the blood_sugar data has been sent", 
            success: true, 
            result: result
        })
    })
}

// 데이터 형식 알려줘야 함! - graph 만들 때 
exports.get_records_when = function (req, res) {

    let req_data = {
        _when: req.params.when
    }

    let sql;

    // 기타 빼고, 기상직후, 취침 전, 새벽 검색 가능 

    if (req_data._when === 'morning' || req_data._when === 'night' || req_data._when === 'dawn') {
        sql = `SELECT id, _when, _value, _status FROM blood_sugar WHERE _when=?`; 
        if (req_data._when === 'morning') {
            req_data._when = '기상 직후'; 
        }
        else if (req_data._when === 'night') {
            req_data._when = '취침 전'; 
        }
        // req_data._when === 'dawn'
        else {
            req_data._when = '새벽'; 
        }

        db.query(sql, [req_data._when], function (err, result) {

            if (err) {
                res.status(500).send({
                    msg: "database ERROR - while connecting to blood_sugar table", 
                    success: false, 
                    result: err
                })
            }
            
            else if (! result[0]) {
                res.status(401).send({
                    msg: "There is no data with when value",
                    success: false, 
                    result: result
                })
            }

            res.status(200).send({
                msg: "blood_sugar data has been sent!", 
                success: true, 
                result: result
            })
        })
    }

    else if (req_data._when === 'before-meal') {
        sql = `SELECT id, _when, _value, _status FROM blood_sugar WHERE _when=? OR _when=? OR _when=?`; 
        
        db.query(sql, ['아침 식전', '점심 식전', '저녁 식전'], function (err, result) {
            if (err) {
                res.status(500).send({
                    msg: "database ERROR - while connecting to blood_sugar table", 
                    success: false, 
                    result: err
                })
            }
            
            else if (! result[0]) {
                res.status(401).send({
                    msg: "There is no data with when value",
                    success: false, 
                    result: result
                })
            }

            res.status(200).send({
                msg: "blood_sugar data has been sent!", 
                success: true, 
                result: result
            })
        })
    }

    else if (req_data._when === 'after-meal') {
        sql = 'SELECT id, _when, _value, _status FROM blood_sugar WHERE _when=? OR _when=? OR _when=?'; 

        db.query(sql, ['아침 식후', '점심 식후', '저녁 식후'], function (err, result) {
            if (err) {
                res.status(500).send({
                    msg: "database ERROR - while connecting to blood_sugar table", 
                    success: false, 
                    result: err
                })
            }
            
            else if (! result[0]) {
                res.status(401).send({
                    msg: "There is no data with when value",
                    success: false, 
                    result: result
                })
            }

            res.status(200).send({
                msg: "blood_sugar data has been sent!", 
                success: true, 
                result: result
            })
        })
    }
}

// exports.get_records_status = function (req, res) {

// }