let express = require('express');
let router = express.Router();
let path = require("path"); 

let greeting = require("./greeting"); 
let blood_sugar = require("./blood_suger"); 

/* GET home page. */
// possible error point 
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../../frontend/public", "index.html")); 
  // res.render('index', { title: 'Express' });
});

router.use("/greeting", greeting); 
router.use('/blood-sugar', blood_sugar); 

module.exports = router;
