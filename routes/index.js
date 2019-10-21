var express = require('express');
var router = express.Router();
var db = require('monk')("localhost/hospital") ;
var mongo = require('mongodb') ;
var url = 'mongodb://localhost:27017/hospital' ;
var MongoClient = require('mongodb').MongoClient;

var User = require('../models/user') ;
var Booking = require('../models/booking') ;


/* GET home page. */
router.get('/', isLoggedIn , function(req, res, next) {
  
      res.render('book/index');
   
});


 router.get('/schedule/:id', isLoggedIn , function(req, res, next) {
    var clcid = req.params.id ;

    MongoClient.connect(url,function(err , db){
        if(err) throw err ;
        var dbo = db.db("hospital") ;
        dbo.collection("booking").find({clinicname:clcid}).toArray(function(err, result) {
            if (err) throw err;
            res.render('book/booking', {  bks: result , clcn:clcid });
            console.log(result) ;
            db.close();
    }) ;

  });
        
 });
   
router.post('/book', function(req, res, next) {
  var clinic    = req.body.clinic;
  var patient = req.body.patient;
  var statue = req.body.statue ;
  var Symptoms     = req.body.Symptoms;
  var date = new Date() ;

  var patid = req.user.id ;


  

     Booking.create({
        "clinicname": clinic,
        "patientname": patient,
        "description": statue,
        "Symptoms": Symptoms ,
        "date":date
    },  function(err, book){
        if(err){
            res.send('There was an issue submitting the post');
        } else {
            res.redirect('/') ; 
            console.log(book) ;
            User.findByIdAndUpdate(
                patid,
                {$push: {"booking":book._id }}, 
                {new: true},
                function(err,user){
                    if(err){
                        res.json({error :err}) ; 
                    }
               }); 
            
            
        }
    });

    


});

router.get('/schedule' ,isLoggedIn ,function(req, res, next){
    res.render('user/schedule');
  });

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
         return next() ;
    }
    res.redirect('user/signin') ;
}
function notLoggedIn(req, res, next){
   if(!req.isAuthenticated()){
        return next() ;
   }
   res.redirect('/') ;
}
module.exports = router;
