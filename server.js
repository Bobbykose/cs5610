// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/my-project'))); // change to 'public'
// app.use(express.static(path.join(__dirname, 'public')));ng1

app.use(session({
  secret: 'this is the secret',
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());
//app.use(session({ secret: process.env.SESSION_SECRET}));

app.use(passport.initialize());
app.use(passport.session());


// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);
server.listen( port , () => console.log('Running on port 3200'));


//var connectionString = 'mongodb://127.0.0.1:27017/webdev'; //local DB
var connectionString = 'mongodb://wenzhang:wenzhang1124@ds117251.mlab.com:17251/heroku_lcx4662p'; //heroku DB


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect( connectionString, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



require("./server/app.js")(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/my-project/index.html'));
});






