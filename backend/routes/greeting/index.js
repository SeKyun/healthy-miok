let express = require("express"); 
let router = express.Router(); 

// Require controller modules 
let greeting_controller = require("../../controllers/greeting_controller"); 

/// GREETING ROUTES ///

/* GET a greeting string data */
router.get("/", greeting_controller.get_greeting); 

module.exports = router; 