var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')
var csrfProtection = csrf();

router.use(csrfProtection);

// var WordSchema = require('../models/word');

/* GET home page. */
router.get('/', function (req, res, next) {
  var messages = req.flash('error');
  res.render('configurator/index', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.get('/configurator', function (req, res, next) {
  res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator" });
});

router.post('/submit-configurator', function (req, res, next) {
  // res.render('configurator/configurator', {csrfToken: req.csrfToken(), title: "Konfigurator" });

  console.log(req.body.pattern);

  if (req.body.pattern == "none") {
    req.body.pattern = "keine Auswahl";
  }
  if (req.body.print == "none") {
    req.body.print = "keine Auswahl";
  }

  console.log(req.body.shoelace);
  return res.render('pages/checkOrder', { configuration: req.body });
  // return res.send({configuration: req.body});
});

router.get('/analytics', function (req, res, next) {
  res.render('pages/analytics', { title: "Impressum" });
});


router.get('/registrieren', function (req, res, next) {
  var messages = req.flash('error');
  res.render('pages/register', { csrfToken: req.csrfToken(), title: "Registrierung", messages: messages, hasErrors: messages.length > 0 });
});

router.post('/registrieren', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/registrieren',
  failureFlash: true
}));

router.post('/einloggen', passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/',
  failureFlash: true
}));


//Testweise -->
router.get('/profile', function (req, res, next) {
  res.render('pages/profile');
});


router.get('/contact', function (req, res, next) {
  res.render('pages/contact', { title: "Kontakt" });
});

router.get('/disclaimer', function (req, res, next) {
  res.render('pages/disclaimer', { title: "Datenschutz" });
});

router.get('/imprint', function (req, res, next) {
  res.render('pages/imprint', { title: "Impressum" });
});




module.exports = router;