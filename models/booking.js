var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;

var schema = new Schema({
    clinicname:{type:String, require: true} ,
    patientname:{type:String, require: true} ,
    description:{type:String, require: true} ,
    Symptoms:{type:String, require: true} ,
    date:  {type:Date, require: true} ,

}) ;

module.exports = mongoose.model('booking',schema) ;