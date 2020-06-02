let express = require('express'); 
let router = express.Router(); 

//Require controller modules
let controller = require('../../controllers/blood_pressure_controller'); 

/// BLOOD PRESSURE ROUTES ///
router.post('/', controller.register); 
router.get('/', controller.get_all); 
router.delete('/', controller.delete_all); 

router.get('/id/:id', controller.get_record_id); 
router.put('/id/:id', controller.update_record_id); 
router.delete('/id/:id', controller.delete_record_id); 

router.get('/date', controller.get_records_date); 
router.get('/date/:today', controller.get_record_today); 
router.get('/average', cotroller.get_average_date); 
router.get('/average/:today', controller.get_average_today);
router.get('/status', controller.get_status_date); 

module.exports = router; 