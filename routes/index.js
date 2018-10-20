var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')
var csrfProtection = csrf();
var Order = require('../models/orders');

router.use(csrfProtection);

/* GET home page. */
router.get('/', function (req, res, next) {
  var messages = req.flash('error');
  if (req.isAuthenticated()) {
    res.render('configurator/index', { csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin, messages: messages, hasErrors: messages.length > 0 });
  }
  else {
    res.render('configurator/index', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  }
});

// ALL THE ROUTES FOR NOT LOGGED IN USERS

router.get('/configurator', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator", loggedin: true, username: req.user.username, isadmin: req.user.admin, });
  } else {
    res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator" });
  }
});

// router.get('/configurator', isLoggedIn, function (req, res, next) {
//   res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator -> LoggedIn" });
// });

// ALL THE ROUTES FOR LOGGED IN USERS

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// router.get('/configurator', function (req, res, next) {
//   res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator" });
// });

router.post('/configurator', function (req, res, next) {

  var price = 50;
  if (req.body.print != "Keine Angabe") {
    price += 5;

  }
  if (req.body.pattern != "Keine Angabe") {
    price += 5;
  }

  if (req.isAuthenticated()) {
    res.render('pages/checkOrder', { configuration: req.body, price: price, csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin, useradress: req.user });
  } else {
    res.render('pages/checkOrder', { configuration: req.body, price: price, csrfToken: req.csrfToken(), });
  }

  // return res.render('pages/checkOrder', { configuration: req.body, csrfToken: req.csrfToken() });
});

router.post('/submit-configuration', function (req, res, next) {
  if (req.isAuthenticated()) {
    var order = new Order({
      date: getDate(),
      user: {
        userID: req.user._id,
      },
      price: req.body.price,
      paymentMethod: "Rechnung",

      configuration: {
        shoelace: req.body.shoelace,
        pattern: req.body.pattern,
        seam: req.body.seam,
        print: req.body.print
      }
    }).save();
    res.render('pages/configurationSent', { configuration: req.body, csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin, useradress: req.user });
  } else {
    res.render('pages/configurationSent', { configuration: req.body, csrfToken: req.csrfToken(), });
  }

  // return res.render('pages/configurationSent', { configuration: req.body });
});

router.get('/analytics', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/analytics', { title: "Impressum", configuration: req.body, csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin });
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



router.get('/contact', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/contact', { title: "Kontakt", csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin });
  } else {
    res.render('pages/contact', { title: "Kontakt", csrfToken: req.csrfToken(), });
  }


});

router.get('/disclaimer', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/disclaimer', { title: "Datenschutz", csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin });
  } else {
    res.render('pages/disclaimer', { title: "Datenschutz", csrfToken: req.csrfToken(), });
  }

});

router.get('/imprint', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/imprint', { title: "Impressum", csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin });
  } else {
    res.render('pages/imprint', { title: "Impressum", csrfToken: req.csrfToken(), });
  }


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


// GET DATE

function getDate() {
  var date = new Date();

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + month + day;
}