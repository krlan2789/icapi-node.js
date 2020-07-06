let express = require('express');
let router = express.Router();

// Navbar
const navbar = require('./navbar_link');

/* GET home page. */
router.get('/', function(req, res, next) {
  const content = {
    title: 'Idea Collections'
  };
  navbar.content = content;
  res.render('index', navbar);
});

module.exports = router;