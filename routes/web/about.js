let express = require('express');
let router = express.Router();

// Navbar
const navbar = require('./navbar_link');

/* GET about page. */
router.get('/', function(req, res, next) {
  const content = {
    title: 'About This Website'
  };
  navbar.content = content;
  res.render('index', navbar);
});

module.exports = router;