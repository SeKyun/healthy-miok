let express = require('express'); 
let router = express.Router(); 

let controller = require('../../controllers/type_insulin_controller'); 

/// TYPE INSULIN ROUTES ///

/** REGISTER the new type of insulin data */
router.post('/', controller.register); 
/** GET type of insulin data */
router.get('/', controller.get_all); 
/** DELETE all type of insulin data registered */
router.delete('/', controller.delete_all); 

