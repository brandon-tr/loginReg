var mongoose = require('mongoose')
var Users = mongoose.model('Users')
var session = require('express-session')
var bcrypt = require('bcrypt')

module.exports = {

   register: function(req, res){
    if(req.body.confpassword != req.body.password){
        res.render('index',{errorss:'Passwords dont match'})
        return false;
    }
    bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err){
                    return false;
                }
            var users = new Users({first_name: req.body.first_name, last_name: req.body.last_name, 
                             password: hash, email: req.body.email})
                    users.save(function(err, user){
                    if(err){
                        res.render('index', {errors:users.errors})
                    }else{
                        res.redirect('/')
                    }
                })                 
            })      
         
   },
   login: function(req, res){
       console.log(req.body.password)
       var check = Users.findOne({email:req.body.email}, function(err, user){
           if(user != null ){
               console.log(user)
                bcrypt.compare(req.body.password, user.password, function(err, res){
                    console.log(err, res)
                } )
            //    if(Users.schema.validPassword(password) == true){
            //     res.redirect('/')
            //    }else{
            //     res.render('index', {errorss:'Invalid password'})
            //    } 
           }else{
               res.render('index', {errorss:'No user found'})
           }
       })
   }
}