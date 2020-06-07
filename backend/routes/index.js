let express = require('express');
let router = express.Router();
let path = require("path"); 

let greeting = require("./greeting"); 
let blood_sugar = require("./blood_sugar"); 
let blood_pressure = require('./blood_pressure'); 

/* GET home page. */
// possible error point 
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../../frontend/public", "index.html")); 
  // res.render('index', { tit le: 'Express' });
});

router.use("/greeting", greeting); 
router.use("/blood-sugar", blood_sugar); 
router.use("/blood-pressure", blood_pressure); 

module.exports = router;
