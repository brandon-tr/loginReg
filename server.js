var express = require('express')
var bodyParser = require("body-parser")
var path = require('path')

var app = express();

require('./server/config/mongoose.js')

app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname , "./Views")))

app.set("view engine", "ejs")

var routes_setter = require('./Server/config/routes.js')
routes_setter(app)

var server = app.listen(5000, function(){
    console.log("listening")
})
