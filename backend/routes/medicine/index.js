let express = require('express'); 
let router = express.Router(); 

let controller = require('../../controllers/medicine_controller'); 

/// TYPE MEDICINE ROUTES ///

/** REGISTER the new type of medicine data */
router.post('/', controller.register); 
/** GET type of medicine data */
router.get('/', controller.get_all); 
/** DELETE all type of medicine data */
router.delete('/', controller.delete_all); 

/** GET all nemes of medicine data */
router.get('/name-list', controller.get_namelist); 

/** GET the data of medicine with its name */
router.get('/:kor_name', controller.get_info_name); 
/** UPDATE the data of medicine with its name */
router.put('/:kor_name', controller.update_info_name); 
/** DELETE the data of medicine with its name */
router.delete('/:kor_name', controller.delete_info_name); 

module.exports = router; 