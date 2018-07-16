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
var helmet = require('helmet');
var compression = require('compression');


// set up express application
app.use(helmet());
app.use(compression());
app.use(morgan('dev')); //log every request to the console
app.use(bodyParser()); //get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: /.*/,
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));


//set up passport
app.use(session({secret: 'notaverysecretsecretbutworksanyway'})); //session secret

//if production, serve static bundle

app.use(express.static('client/build'));

//launch
app.listen(port);
console.log('it happens on port ' + port);

//routes
var authRoute = require('./app/routes/auth.js')(app);
var uploadRoute = require('./app/routes/upload.js')(app);
var songRenderRoute = require('./app/routes/songs.js')(app);
var playListRoute = require('./app/routes/playlists.js')(app);
var searchRoute = require('./app/routes/search.js')(app);
var songPlaylistRoute = require('./app/routes/songPlaylist.js')(app);
var imageUploadRoute = require('./app/routes/imageUpload.js')(app);
var followerRouter = require('./app/routes/follower.js')(app);
var messagesRouter = require('./app/routes/messages.js')(app);
var forumsRouter = require('./app/routes/forums.js')(app);
