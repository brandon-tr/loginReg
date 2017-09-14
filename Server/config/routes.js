var User = require('../controllers/users.js')


module.exports = function(app){

    app.get('/',function(req, res){
        res.render('index')
    })
    app.post('/register',function(req, res){
       User.register(req,res)
    })
    app.post('/login',function(req,res){
        User.login(req,res)
    })
}
