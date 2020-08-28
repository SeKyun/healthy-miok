let express = require('express');
let router = express.Router();
let path = require("path"); 

let greeting = require("./greeting"); 
let blood_sugar = require("./blood_sugar"); 
let blood_pressure = require('./blood_pressure'); 
let insulin = require('./insulin'); 
let type_insulin = require('./type_insulin'); 
let medicine = require('./medicine'); 
let medication = require('./medication'); 

// /* GET home page. */
// possible error point 
// 이거 고쳐야 하는데......
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../../frontend/public", "index.html")); 
  // res.render('index', { tit le: 'Express' });
});

router.use("/greeting", greeting); 
router.use("/blood-sugar", blood_sugar); 
router.use("/blood-pressure", blood_pressure); 
router.use("/insulin", insulin); 
router.use("/type-insulin", type_insulin); 
router.use("/medicine", medicine); 
router.use("/medication", medication); 

module.exports = router;
