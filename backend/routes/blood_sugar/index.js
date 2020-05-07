let express = require("express"); 
let router = express.Router(); 

// Require controller modules 
let controller = require("../../controllers/blood_sugar_controller"); 

/// BLOOD SUGAR ROUTES ///

/* REGISTER the new blood sugar data */
router.post('/', controller.register); 
// /* GET blood sugar data */
// router.get('/', controller.get-all);
// /* DELETE all blood sugar data registered */
// router.delete('/', constroller.delete-all); 

// /* GET the blood sugar data of a specific id */
// router.get('/record', controller.get-record); 
// /* UPDATE the blood sugar data of a specific id */
// router.put('/record', controller.update-record); 
// /* DELETE the blood sugar data of a specific id */
// router.delete('/record', controller.delete-record); 

// /* GET blood sugar data of a specific date */
// router.get('/date/:date', controller.get-records-date); 
// /* DELETE blood sugar data of a specific date */
// router.delete('/date/:date', controller.delete-records-date); 

// /* GET blood sugar data of a specific time */
// router.get('/when/:when', controller.get-records-when); 

// /* GET blood sugar data of a specific status */ 
// router.get('/status/:status', controller.get-records-staus); 

module.exports = router; 