let express = require('express'); 
let router = express.Router(); 

//Require controller modules
let controller = require('../../controllers/blood_pressure_controller'); 

/// BLOOD PRESSURE ROUTES ///

/** REGISTER the new blood pressure data */
router.post('/', controller.register); 
/** GET blood pressure data */
router.get('/', controller.get_all); 
/** DELETE all blood pressure data registered */
router.delete('/', controller.delete_all); 

/** GET the blood pressure data by id */
router.get('/id/:id', controller.get_record_id); 
/** UPDATE blood pressure data by id */
router.put('/id/:id', controller.update_record_id); 
/** DELETE blood pressure data by id*/
router.delete('/id/:id', controller.delete_record_id); 

/** GET blood pressure data between start date and end date*/
router.get('/date', controller.get_records_date);  
/** GET blood pressure data of a specific today date */
router.get('/date/:today', controller.get_record_today); 

/** GET blood pressure statistics result between start date and end date */
router.get('/statistics', cotroller.get_statistics_date); 
/** GET  blood pressure statistics result of a specific today date*/
router.get('/statistics/:today', controller.get_statistics_today);