const db = require("../data/db"); 
// const lib = require('../library/blood_pressure_lib'); 
const res_handler = require('../library/status_handler'); 
const resource = "medicine"; 
const moment = require('moment'); 


//=================================================================
// request URL:  /medicine
//=================================================================

// register new data in the table 
exports.register = function (req, res) {
    let now = moment().format("YYYY-MM-DD HH:mm:ss"); 
    let req_data = {
        kor_name: req.body.name, 
        company: req.body.company,
        dose: req.body.dose,
        note: req.body.note,
        memo: req.body.memo,  
        link: req.body.link, 
        registered: now
    }; 

    let sql = `INSERT INTO ${resource} SET ?`;
    db.query(sql, req_data, function(err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "creating " + resource); 
        }

        return res_handler.sendSuccess(result, 201, res, resource); 
    }); 
}

// get all the data in the table 
exports.get_all = function(req, res) {
    let sql = `SELECT * FROM ${resource} ORDER BY kor_name`; 

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

        return res_handler.sendSuccess(result, 204, res, resource); 
    }) 
}

//=================================================================
// request URL:  /medicine/name-list
//=================================================================

// get all name list from the table
exports.get_namelist = function (req, res) {
    let sql = `SELECT kor_name FROM ${resource} ORDER BY kor_name`; 

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



//=================================================================
// request URL:  /medicine/:kor_name
//=================================================================

// get data from the table by medicine's kor_name
exports.get_info_name = function(req, res) {
    let kor_name = req.params.kor_name; 
    let sql = `SELECT * FROM ${resource} WHERE kor_name=?`; 
    db.query(sql, [kor_name], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "getting " + resource + " by name"); 
        }
        
        if (! result[0]) {
            return res_handler.sendSuccess(result, 204, res, resource); 
        }

        return res_handler.sendSuccess(result, 200, res, resource); 
    })
}

// update data from the table by medicine's kor_name
exports.update_info_name = function (req, res) {
    let kor_name = req.params.kor_name; 
    let req_data = {
        link: req.body.link, 
        note: req.body.note, 
        memo: req.body.memo
    };

    // possible error point 
    let sql = `UPDATE ${resource} SET ? WHERE kor_name=?`; 
    db.query(sql, [req_data, kor_name], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "updating " + resource + " by name"); 
        }

        return res_handler.sendSuccess(result, 204, res, resource); 
    })
}

// delete data from the table by medicine's kor_name
exports.delete_info_name = function (req, res) {
    let kor_name = req.params.kor_name; 
    let sql = `DELETE FROM ${resource} WHERE kor_name=?`; 
    db.query(sql, [kor_name], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource + " by name"); 
        }
        
        return res_handler.sendSuccess(result, 204, res, resource); 
    })
}
