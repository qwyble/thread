var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cors = require('cors');
const multer = require('multer');
const uuidv4 = require('uuid/v4');


var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
var cloud_bucket = require('./uploads/upload.js');

//configuration
mongoose.connect(configDB.url);

require('./config/passport')(passport); //pass passport for configuration


// set up express application
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser()); //get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); //ejs for templating

//required for passport
app.use(session({secret: 'notaverysecretsecretbutunlikelytobeguessed'}));
app.use(passport.initialize());
app.use(passport.session()); // persisten login sessions
app.use(flash()); //use connect-flash for flash messages stored in sessions
app.use(cors());
//app.use('/public', express.static(__dirname + '/public'));


//create the multer instance that will be used to upload/save the file
const upload = multer({
  storage: multer.MemoryStorage,
  fileFilter: function(req, file, cb) {
    console.log(file.mimetype);
    if(file.mimetype !== 'audio/wav' && file.mimetype !== 'audio/mpeg'){
      return cb(new Error('only wavs and mp3s are allowed'))
    }
    cb(null, true)
  }
});

app.post('/upload', upload.single('songFile'), (req, res) => {
  res.send();
  cloud_bucket.upload(req.file);
  res.end();

});

//routes
require('./app/routes.js')(app, passport); //load our routes and pass in our app and fully configured passport

//launch
app.listen(port);
console.log('it happens on port ' + port);
