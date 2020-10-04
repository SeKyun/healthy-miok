const db = require("../data/db"); 

// select greeting and send String 
exports.get_greeting = function(req, res) {

    let sql = "SELECT COUNT(id) AS count FROM greeting ";
    db.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send ({
                msg: "database ERROR - while counting the rows of table greeting ", 
                success: false, 
                result: err
            })
        }

        let num = Math.floor(Math.random() * (result[0].count- 1)) + 1; 
        // console.log(num); 

        sql = "SELECT * FROM greeting WHERE id=?";
        db.query(sql, [num], function (err, result) {
            if (err) {
                return res.status(500).send ({
                    msg: "database ERROR - while getting the rows of table greeting", 
                    success: false, 
                    result: err
                })
            }

            console.log(result[0].content); 
    
            return res.status(200).send({
                msg: "the greeting has been sent", 
                success: true,  
                result: result
            })

        });
    }); 

}; 