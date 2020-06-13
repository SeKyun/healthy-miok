let express = require('express');
let router = express.Router();
let path = require("path"); 

let greeting = require("./greeting"); 
let blood_sugar = require("./blood_sugar"); 
let blood_pressure = require('./blood_pressure'); 
let insulin = require('./insulin'); 
let type_insulin = require('./type_insulin'); 

/* GET home page. */
// possible error point 
router.get('/', function(req, res) {
  res.sendFile(path.join("index.html")); 
  // res.render('index', { tit le: 'Express' });
});

router.use("/greeting", greeting); 
router.use("/blood-sugar", blood_sugar); 
router.use("/blood-pressure", blood_pressure); 
router.use("/insulin", insulin); 
router.use("/type-insulin", type_insulin); 

module.exports = router;
