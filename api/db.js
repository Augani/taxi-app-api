
// const mongoose = require('mongoose');
// const connectionString = 'mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/taxi?retryWrites=true&w=majority'
// //  const connectionString = 'mongodb://localhost:27017/taxi';
// const Connector = mongoose.connect(connectionString,{useNewUrlParser: true});
// Connector.then(r=>{
//   console.log('connected');
// }).catch(e=>{
//   console.log(e);
// })
// var mongoose = require("mongoose");
// mongoose.connect('mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/taxi?retryWrites=true&w=majority');

// var connection = mongoose.connection;

// // connection.on('error', console.error.bind(console, 'connection error:'));
// connection.on('open', function(){
//     console.log("connected");
// })

// module.exports = connection;

const mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/taxi?retryWrites=true&w=majority';

const DB = mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    //...
    console.log('connected');

    return client;
    
  })

 

  module.exports = DB;
