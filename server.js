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

// Init Express
var app = express();

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

app.post('/active', function(req, res) {
    var d = new Date();
    var time = formatAMPM(d);

    console.log(time);

    var params = {
        icon_emoji: ':table_tennis_paddle_and_ball:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('pingpong', 'A game started @ ' + time, params, function(data) {
        console.log(data);
    });
});

app.post('/inactive', function(req, res) {
    var d = new Date();
    var time = formatAMPM(d);
    var params = {
        icon_emoji: ':table_tennis_paddle_and_ball:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('pingpong', 'A game ended @ ' + time, params, function(data) {
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
