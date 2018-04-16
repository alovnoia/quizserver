var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Topic = require('./api/models/topicModel'), //created model loading here
  Admin = require('./api/models/adminModel'),
  Question = require('./api/models/questionModel'),
  Package = require('./api/models/packageModel'),
  Challenge = require('./api/models/challengeModel'),
  Game = require('./api/models/gameModel'),
  bodyParser = require('body-parser');
global.imageUrl = 'assets/img/';

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Pass to next layer of middleware
    next();
});
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Quizdb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('quiz RESTful API server started on: ' + port);
//"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath "d:\MongoStore\data"
//net start MongoDB