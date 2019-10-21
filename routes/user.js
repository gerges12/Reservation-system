var express = require('express');
var router = express.Router();
var csrf = require('csurf') ;
var passport = require('passport') ;
var User = require('../models/user') ;
var Booking = require('../models/booking') ;

var path  = require("path") ;
var fs = require('fs');

const fileUpload = require('express-fileupload');

router.use(fileUpload());


var csrfProtection = csrf({ cookie: true })
router.use(csrfProtection) ;

router.get('/profile', isLoggedIn ,function(req, res, next){
       var cuser= req.user.name ;

       User.
  findOne({name:cuser}).
  populate("booking").
  exec(function (err, user) {
    if (err) return err;
    res.render('user/profile' , {books:user.booking , indec:true}); 

  });

  });


  router.get('/inf',csrfProtection, isLoggedIn ,function(req, res, next){
    var messages = req.flash('error') ;

    res.render('user/inf' ,  { csrfToken: req.csrfToken() , messages:messages, hasErrors: messages.length > 0 } );
  });

  router.post('/inf/:id',csrfProtection , function(req, res, next){
    var patid = req.params.id ;

    var name = req.body.name ;
    var phone = req.body.phone ;
    var bday = req.body.bday ;
    var city = req.body.city ;

    var file = req.files.foo

file.mv(path.join(__dirname ,"/uploads/" + file.name ), err => { 
if (err) throw err;
console.log("file moved succ" );
});
    console.log(req.files.foo);

        User.findByIdAndUpdate(
        patid,
        {$set: {"name": name,
        "phone": phone,
        "bday": bday,
        "city": city ,
        "ph" :file.name
        
      }}, 
        {new: true},
        function(err,user){
            if(err){
                res.json({error :err}) ; 
            }
            console.log(user) ;

        });
        res.redirect('/') ;
}) ;



router.get('/logout' , isLoggedIn , function(req, res, next){
    req.logout() ;
    res.redirect('/user/signin') ;
    req.session.destroy();

 });

router.use('/', notLoggedIn, function(req, res, next){
    next() ;
}) ;

router.get('/signup',function(req, res, next){
    var messages = req.flash('error') ;
 
    res.render('user/signup',{csrfToken: req.csrfToken() ,messages:messages, hasErrors: messages.length > 0}  );
 });  
 
 router.post('/signup',passport.authenticate('local.signup', {
     successRedirect:'/user/inf',
     failureRedirect: '/user/signup' ,
     failureFlash:true
 }));

 

 
  
 router.get('/signin',function(req, res, next){
   var messages = req.flash('error') ;
 
   res.render('user/signin',{csrfToken: req.csrfToken() , messages:messages, hasErrors: messages.length > 0}  );
 });  
 
 router.post('/signin',passport.authenticate('local.signin', {
    successRedirect:'/user/profile',
    failureRedirect: '/user/signin' ,
    failureFlash:true
 }));

 

 module.exports = router;

 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
          return next() ;
     }
     res.redirect('/') ;
 }
 function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
         return next() ;
    }
    res.redirect('/') ;
}