let express = require('express');
let router = express.Router();

// Navbar
const navbar = require('./navbar_link');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
