var Product = require('../models/product') ;

var mongoose = require('mongoose') ;
mongoose.connect('mongodb://localhost:27017/shopping',{ useNewUrlParser: true }) ;

var products = [
    new Product({
    imagePath:'https://wallpapersite.com/images/pages/pic_w/8274.jpg',
    title:'Anthem Wallpaper' ,
    description:'Awesome Game!!!!' ,
    price:60
}) ,

new Product({
    imagePath:'https://wallpapersite.com/images/pages/pic_w/7768.jpg',
    title:'A Way Out' ,
    description:'Spider Man Games, we choose the best Spider Man Games for you to play. ' ,
    price:30
}) ,
new Product({
    imagePath:'https://i.ytimg.com/vi/PSn7fF1OE40/hqdefault.jpg',
    title:'fifa' ,
    description:'the egyption version of fifa play with your friends' ,
    price:75
}) ,
new Product({
    imagePath:'https://www.dailydot.com/wp-content/uploads/65b/b0/residenteviljpg-19a941_1280w-910x512.jpeg' ,
    title:'Horizon: Zero Dawn' ,
    description:'Known mostly for the futuristic shooter Killzone series,' ,
    price:80
})

];

var done = 0;
for(var i =0; i <products.length; i++){
    products[i].save(function(err,result){
        done++;
        console.log('data was saved') ;

        if(done === products.length ){
            exit() ;
    } ;
}) } ;
function exit(){
    mongoose.disconnect() ;
} ;