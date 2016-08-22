// Declare vars
var port, http, https, firebase, express, path, fs, qs, request, Slackbot;

// Require vars and modules
path         = require('path'),
http         = require('http'),
https        = require('https'),
express      = require('express'),
firebase     = require('firebase'),
qs           = require('querystring'),
fs           = require('fs'),
bodyParser   = require('body-parser'),
cors         = require('cors'),
request      = require('request'),
Slackbot     = require('slackbots');

var bot = new Slackbot({
    token : 'xoxb-71725181620-reWWEfCLp1OwvvKhOTQZCEu4',
    name  : 'pongbot'
});

var serverTime = firebase.database.ServerValue.TIMESTAMP;

// Init Express
var app = express();

app.post('/active', function(req, res) {
    var params = {
        icon_emoji: ':table_tennis_paddle_and_ball:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('pingpong', 'A game started @ ' + serverTime, params, function(data) {
        console.log(data);
    });
});

app.post('/inactive', function(req, res) {
    var params = {
        icon_emoji: ':table_tennis_paddle_and_ball:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('pingpong', 'A game ended @ ' + serverTime, params, function(data) {
        console.log(data);
    });
});


// Enable cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Basic route
app.get('/', function(req, res) {
    res.sendFile('/public/index.html');
});

// Ensure the app routes don't break when the page is
// refreshed
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

port = process.env.PORT || 8000;

// Init server
var server = http.createServer(app).listen(port, function() {
    console.log('Server listening on port ' + port);
});
