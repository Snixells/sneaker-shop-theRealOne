var passport = require('passport');
var User = require('../models/user');
var MetaData= require('../models/metadata');

var LocalStrategy = require('passport-local').Strategy;



passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    })

});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},function(req,username,password,done){
    req.checkBody('username','Invalid username').notEmpty();
    req.checkBody('password','Invalid password').notEmpty().isLength({min:4});
    
    var errors = req.validationErrors();
    if (errors){
        var messages=[];
        errors.forEach(function(error){
            messages.push(error.msg);
        })
        return done(null, false, req.flash('error',messages));
    }
    User.findOne({'username':username},function(err,user){
        if (err){
            return done(err);
        }
        if (user){
            return done(null, false, {message: 'Username is already in use.'});
        }
        var newUser=new User();
            newUser.username=username;
            newUser.password=newUser.encryptPassword(password);
            newUser.surname=req.body.surname;
            newUser.forename=req.body.forename;

            newUser.adress.streetnumber=req.body.streetnumber;
            newUser.adress.street=req.body.street;
            newUser.adress.postcode=req.body.postcode;
            newUser.adress.location=req.body.location;
            newUser.phonenumber=req.body.phoneNumber;

            newUser.birthday=req.body.birthday;
           
            newUser.email=req.body.email;
            newUser.admin=false;
            newUser.save(function(err,result){
                if (err){
                        return done(err);
                }
                return done(null, newUser);
            })
    });


}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
    function(req,username,password,done){
        req.checkBody('username','Invalid username').notEmpty();
        req.checkBody('password','Invalid password').notEmpty();
        var errors = req.validationErrors();
        if (errors){
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);

            });
            return done(null, false, req.flash('error',messages));
        }
        User.findOne({'username': username},function(err,user){
            if (err){
                return done(err);
            }
            if (!user) {
                return done(null,false,{message: 'No User found'});
            }
            if (!user.validPassword(password)){
                return done(null,false,{message: 'Wrong password.'});
            }
           
            
            var today  = new Date();
            MetaData.findOne({'date':today.toLocaleDateString("de-DE")},function(err,metadata){
                if (err){
                    return done(err);
                }
                if (!metadata) {
                    
                    var today  = new Date();
                    var newMetaData=new MetaData();
                    newMetaData.date=today.toLocaleDateString("de-DE");
                    newMetaData.loginsThisDay=1;
                    newMetaData.save(function(err){
                        if (err)
                     console.log('error')
                    else
                    console.log('success')
                    })
                }
                if(metadata){
                metadata.loginsThisDay = metadata.loginsThisDay+1;
                metadata.save(function(err){
                    if (err)
                     console.log('error')
                    else
                    console.log('success')
                })
            }
            })
            
            return done(null, user);

          
        });
    }));
