let express = require('express'); 
let router = express.Router(); 

let controller = require('../../controllers/medication_controller'); 

/// TYPE MEDICATION ROUTES ///

/** REGISTER the new type of medication data */
router.post('/', controller.register); 
/** GET type of medication data */
router.get('/', controller.get_all); 
/** DELETE all type of medication data */
router.delete('/', controller.delete_all); 

/** GET the data of medication with id */
router.get('/id/:id', controller.get_record_id); 
/** UPDATE the data of medication with id */
router.put('/id/:id', controller.update_record_id); 
/** DELETE the data of medication with id */
router.delete('/id/:id', controller.delete_record_id);

/** GET all the data of medication of today(date) */
router.get('/date/:today', controller.get_record_today); 

/** GET all the data of medication between startDate and endDate */
router.get('/date', controller.get_records_date); 

module.exports = router; 