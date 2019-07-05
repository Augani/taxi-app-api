var express = require('express');
var app = express();
const PORt = process.env.PORT || 3232;
var server = app.listen(PORt);
var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/taxi?retryWrites=true&w=majority'
//  const connectionString = 'mongodb://localhost:27017/taxi';
const connector = mongoose.connect(connectionString,{useNewUrlParser: true});
connector.then(r=>{
  console.log('connected');
}).catch(e=>{
  console.log(e);
})

const login = require('./api/auth/login');
const maps = require('./api/routes/maps')

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });



app.use('/api/login', login);
app.use('/api/maps', maps);


// server.listen(PORt, function(){
//   console.log('listening on *:3000');
// });


// The event will be called when a client is connected.
io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
});