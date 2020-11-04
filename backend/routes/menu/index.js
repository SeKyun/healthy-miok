let express = require('express');
let router = express.Router();

let controller = require('../../controllers/menu_controller');

/// TYPE MEDICINE ROUTES ///

/** REGISTER the new type of medicine data */
router.get('/', controller.get_menu);
/** GET type of medicine data */

module.exports = router;