var mongoose = require('mongoose')
var validate = require('mongoose-validator')
var bcrypt = require('bcrypt')

var NameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3],
        message: 'Name should be more than 2 characters'
    }),
    validate({
        validator: 'isAlpha',
        message: 'Name should contain only letters'
    })
]
var EmailValidator = [
    validate({
        validator: 'isLength',
        arguments: [3],
        message: 'Name should be more than 2 characters'
    }),
    validate({
        validator: 'isEmail',
        message: 'Please enter a valid email'
    })
]
var PasswordValidator= [
    validate({
        validator: 'isLength',
        arguments: [5],
        message: 'Password should be more than 4 characters'
    }),
]

var UserSchema = new mongoose.Schema({
    first_name: {type:String, required:[true,'You need to have a first name'], validate:NameValidator},
    last_name: {type:String, required:[true,'You need to have a last name'], validate:NameValidator},
    email: {type:String, required:[true,'You need to have a email'], unique:true ,validate:EmailValidator},
    password: {type:String, required:[true,'You need to have a password'], validate:PasswordValidator},
},{timestamps:true})

// UserSchema.pre('save', function(next){
//     var user = this
//     bcrypt.hash(user.password, 10, function(err, hash){
//         if(err){
//             return next(err)
//         }
//         user.password = hash
//         next()
//     })
// })

var Users = mongoose.model('Users', UserSchema)

