var express = require('express');
var app = express();
const PORt = 3232 || process.env.PORT;
var server = app.listen(PORt);
var io = require('socket.io').listen(server);


const mongoose = require('mongoose');
  const connectionString = 'mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/test?retryWrites=true&w=majority'
//  const connectionString = 'mongodb://localhost:27017/taxi';
const connector = mongoose.connect(connectionString,{useNewUrlParser: true});
connector.then(r=>{
  console.log('connected');
}).catch(e=>{
  console.log(e);
})

const login = require('./api/auth/login');

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.use('/api', login);


// server.listen(PORt, function(){
//   console.log('listening on *:3000');
// });


// The event will be called when a client is connected.
io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
});