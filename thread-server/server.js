var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var cors = require('cors');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var env = require('dotenv').load();


// set up express application
app.use(morgan('dev')); //log every request to the console
app.use(bodyParser()); //get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//set up passport
app.use(session({secret: 'notaverysecretsecretbutworksanyway'})); //session secret


//launch
app.listen(port);
console.log('it happens on port ' + port);


//routes
var authRoute = require('./app/routes/auth.js')(app);
