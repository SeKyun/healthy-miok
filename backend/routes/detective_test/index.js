let express = require('express');
let router = express.Router();
let controller = require('../../controllers/detective_test_controller');

router.get('/', controller.get_result); 

module.exports = router; 