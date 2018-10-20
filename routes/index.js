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
  if (req.isAuthenticated()) {
  res.render('configurator/index', { csrfToken: req.csrfToken(),loggedin:true,username:req.user.username ,isadmin: req.user.admin, messages: messages, hasErrors: messages.length > 0 });
  }
  else {
    res.render('configurator/index', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  }
});

// ALL THE ROUTES FOR NOT LOGGED IN USERS

router.get('/configurator', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator",loggedin:true,username:req.user.username,isadmin: req.user.admin, });
  } else {
    res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator" });
  }
});

// router.get('/configurator', isLoggedIn, function (req, res, next) {
//   res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator -> LoggedIn" });
// });

// ALL THE ROUTES FOR LOGGED IN USERS

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// router.get('/configurator', function (req, res, next) {
//   res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator" });
// });

router.post('/configurator', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/checkOrder', { configuration: req.body,csrfToken: req.csrfToken(),loggedin:true,username:req.user.username, isadmin: req.user.admin});
  } else {
    res.render('pages/checkOrder', { configuration: req.body, csrfToken: req.csrfToken(), });
  }

 // return res.render('pages/checkOrder', { configuration: req.body, csrfToken: req.csrfToken() });
});

router.post('/submit-configuration', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('pages/logedinorder', {  configuration: req.body,csrfToken: req.csrfToken(),loggedin:true,username:req.user.username,isadmin: req.user.admin, useradress: req.user });
  } else {
    res.render('pages/guestorder', { configuration: req.body, csrfToken: req.csrfToken(), });
  }

  //return res.render('pages/configurationSent', { configuration: req.body });
});

router.get('/analytics', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/analytics', {title: "Impressum", configuration: req.body,csrfToken: req.csrfToken(),loggedin:true,username:req.user.username, isadmin: req.user.admin});
  } else {
   
  }

 
});


router.get('/registrieren', function (req, res, next) {
  var messages = req.flash('error');
  res.render('pages/register', { csrfToken: req.csrfToken(), title: "Registrierung", messages: messages, hasErrors: messages.length > 0 });
});

router.post('/registrieren', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/registrieren',
  failureFlash: true
}));

router.post('/einloggen', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));

// router.get('/loggedin', function (req, res, next) {
//   //var user = req.params.
//   if (req.isAuthenticated()) {
//     res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator -> LoggedIn", loggedin: true });
//   }
// });

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
})

//Testweise -->
router.get('/profile', isLoggedIn, function (req, res, next) {
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

// SECURITY
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
