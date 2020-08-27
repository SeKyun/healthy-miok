const db = require("../data/db"); 
// const lib = require('../library/blood_pressure_lib'); 
const res_handler = require('../library/status_handler'); 
const resource = "type_insulin"; 
const moment = require('moment'); 


//=================================================================
// request URL:  /type-insulin
//=================================================================
// register new data in the table
//possible error point 
exports.register = function (req, res) {
   let req_data = {
       _name: req.body.name, 
       _type: req.body.type
   }; 

   let sql = `SELECT * FROM ${resource} WHERE _name=?`; 

   db.query(sql, [req_data._name], function (err, result) {
       if (err) {
           return res_handler.sendError(err, 500, res, resource); 
       }

       else if (result[0]) {
           return res_handler.sendError(result[0], 409, res, resource); 
       }

       let now = moment(); 
       req_data.created = now.format("YYYY-MM-DD HH:mm:ss"); 
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
    let sql = `SELECT * FROM ${resource} ORDER BY _name DESC`; 

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
// request URL:  /type-insulin/:type
//=================================================================
// get all the data in the table 
exports.get_bytype = function (req, res) {
    let type = req.params.type; 
    let sql = ""; 
    if (type === 'long') {
        sql = `SELECT * FROM type_insulin_long`; 
    }
    else {
        sql = `SELECT * FROM type_insulin_short`; 
    }

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

//=================================================================
// request URL:  /type-insulin/:name
//=================================================================
// delete data with its name
//possible error point 
exports.delete_type = function (req, res) {
    const _name = req.body.name; 
    const sql = `DELETE FROM type_insulin WHERE _name=?`; 

    db.query(sql, [_name], function (err, result) {
        if (err) {
            return res_handler.sendError(err, 500, res, "deleting " + resource + " with name"); 
        }

        return res_handler.sendSuccess(result, 204, res, resource); 
    })
}



