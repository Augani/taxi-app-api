var express = require('express');
var router = express.Router();
const axios = require('axios');
const secret = "6TT9fwQPuD3sA8tx";
const key = "489e85b1";
const DB = require('../db');
const testKey = "e6942459";
const testSecret = "uCs1TfULvpAQjVEp";


//  var db  = DB;

const mongo = require('mongodb').MongoClient;
const urlTest = "mongodb://localhost:27017" || 'mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/taxi?retryWrites=true&w=majority';

// const db = mongo.connect(urlTest, (err, client) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     //...
//     console.log('db connected');

//     return client;
    
    
//   })



function findit (name, query, cb) {
  mongo.connect(urlTest, (err, client) => {
    var db = client.db('taxi');
    if(err){
      return cb("err", null);
    }
    const coll = db.collection(name);
    coll.find(query).toArray(cb);
    client.close();
  })
  
}

function insert (name,data,cb){
  mongo.connect(urlTest, (err, client) => {
    var db = client.db('taxi');
    if(err){
      return cb("err", null);
    }
    const coll = db.collection(name);
    coll.insertOne(data,cb);
    client.close();
  })
  
}

function update(name,cond, data, cb){
  mongo.connect(urlTest, (err, client) => {
    var db = client.db('taxi');
    if(err){
      return cb("err", null);
    }
    const coll = db.collection(name);
  coll.updateOne({phone: cond}, {'$set': data},cb);
    client.close();
  })
  
}

router.post('/login', function (req, res) {
  var data = req.body;
  var s = {
  api_key: key,
    api_secret: secret,
    number: data.phone,
    brand: "bcTaxi",
    country: "US",
    code_length: 4
  }
  var r;
  axios.get('https://api.nexmo.com/verify/json', {params:s})
  .then(function (response) {
    r = response;
  })
  .catch(function (error) {
    // res.json({
    //   code: 201,
    //   error: error
    // })
  }).then(()=>{
    res.json({
      code: 200,
      data: r.data
    })
  })
})



router.post('/verify', function (req, res) {
  var data = req.body;
  var s = {
    api_key: key,
    api_secret: secret,
    request_id: data.id,
    code: data.code
   
    
  }
  axios.get('https://api.nexmo.com/verify/check/json', {params:s})
  .then(function (response) {
    console.log(response.data);
    if(response.data.status == "0"){
      findit('users',{phone: data.phone}, (err,doc)=>{
        
        if(!doc.length){
          insert('users', {phone: data.phone}, (err,data)=>{
            if(data){
              res.json({
                code: 200,
                data: data
              })
            }else{
              res.json({
                code: 205,
                data: doc
              })
            }
          })
        }
      })

    }else if(response.data.status == "6"){
      res.json({
        code: 203,
        data: "Number already verified"
      })
    }else{
      res.json({
        code: 203,
        data: "Wrong code"
      })
    }
   
  
  })
  .catch(function (error) {
   
  });
})



module.exports = router;