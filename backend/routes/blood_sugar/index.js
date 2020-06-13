let express = require("express"); 
let router = express.Router(); 

// Require controller modules 
let controller = require("../../controllers/blood_sugar_controller"); 

/// BLOOD SUGAR ROUTES ///

/* REGISTER the new blood sugar data */
router.post('/', controller.register); 
/* GET blood sugar data */
router.get('/', controller.get_all);

// /* DELETE all blood sugar data registered */
router.delete('/', controller.delete_all); 

/* GET the blood sugar data of a specific today and when value */
router.get('/record', controller.get_record); 
/* UPDATE the edited blood sugar data of a specific today and when value */
router.put('/record', controller.update_record);

// /* GET blood sugar data of a specific date */
router.get('/date/:date', controller.get_records_today); 
// /* DELETE blood sugar data of a specific date */
// router.delete('/date/:date', controller.delete-records-date); 

// /* GET blood sugar data of a specific time */
router.get('/when/:when', controller.get_records_when); 

// /* GET blood sugar data of a specific status */ 
// router.get('/status/:status', controller.get-records-status); 

module.exports = router; 