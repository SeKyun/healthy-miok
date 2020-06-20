let express = require('express'); 
let router = express.Router(); 

let controller = require('../../controllers/insulin_controller'); 

/// INSULIN ROUTES ///

/** REGISTER the new insulin data */
router.post('/', controller.register); 
/** GET insulin data */
router.get('/', controller.get_all); 
/** DELETE all insulin data registered */
router.delete('/', controller.delete_all); 

/** GET the insulin data by id */
router.get('/id/:id', controller.get_record_id); 
/** UPDATE insulin data by id */
router.put('/id/:id', controller.update_record_id); 
/** DELETE insulin data by id*/
router.delete('/id/:id', controller.delete_record_id); 

/** GET the short type insulin data by today and when data*/
router.get('/record/short', controller.get_record_short);
/** GET the long type insulin data by today */
router.get('/record/long', controller.get_record_long);  

/** GET insulin data between start date and end date*/
router.get('/date', controller.get_records_date);  
/** GET insulin data of a specific today date */
router.get('/date/:today', controller.get_records_today); 
/** GET the insulin data by when data */
router.get('/when/:when', controller.get_records_when)

module.exports = router; 