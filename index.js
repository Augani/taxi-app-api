const express = require('express');
const http = require('http')
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const websocket = socketio(server);
const mongoose = require('mongoose');
 const connectionString = 'mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/test?retryWrites=true&w=majority'
// const connectionString = 'mongodb://localhost:27017/taxi';
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

const PORt = 3232 || process.env.PORT;
server.listen(PORt, function(){
  console.log('listening on *:3000');
});

console.log(websocket)

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
});