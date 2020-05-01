const pool = require("../data/db"); 

// select greeting and send String 
exports.get_greeting = function(req, res) {
    let index = 0; 

    let sql = "SELECT COUNT(id) AS count FROM greeting ";
    pool.query(sql, function (err, result) {
        if (err) {
            return result.status(500).send ({
                msg: "database ERROR - while counting the rows of table greeting ", 
                code: "fail", 
                result: err
            })
        }

        let count = result[0].count;
        index = Math.floor(Math.random() * (count - 1)) + 1; 
    }); 

    sql = "SELECT * FROM greeting WHERE id=?"; 
    pool.query(sql, [index], function (err, result) {
        if (err) {
            return result.status(500).send ({
                msg: "database ERROR - while getting the rows of table greeting", 
                code: "fail", 
                result: err
            })
        }

        return res.status(200).send({
            msg: "the greeting has been sent", 
            code: "success", 
            result: result
        })


    }); 

}; 