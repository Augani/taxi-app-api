var express = require('express');
var app = express();
const PORt = process.env.PORT || 3232;
var server = app.listen(PORt);
var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');

const Db = require('./api/db');

Db.initMain();
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));




const login = require('./api/auth/login');
const maps = require('./api/routes/maps')
const user = require('./api/routes/user');

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });



app.use('/api/auth', login);
app.use('/api/maps', maps);
app.use('/api/user', user);


// server.listen(PORt, function(){
//   console.log('listening on *:3000');
// });


// The event will be called when a client is connected.
io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
});