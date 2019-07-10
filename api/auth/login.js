var express = require('express');
var router = express.Router();
const axios = require('axios');
const secret = "6TT9fwQPuD3sA8tx";
const key = "489e85b1";

const testKey = "e6942459";
const testSecret = "uCs1TfULvpAQjVEp";

function find (name, query, cb) {
  const coll = db.collection(name);
  coll.find(query).toArray(cb)
}

function insert (name,data,cb){
  const coll = db.collection(name);
  coll.insertOne(data,cb);
}

function update(name,cond, data, cb){
  const coll = db.collection(name);
  collection.updateOne({phone: cond}, {'$set': data},cb);
}

router.post('/login', function (req, res) {
  var data = req.body;
  var s = {
  api_key: key,
    api_secret: secret,
    number: data.phone,
    brand: "bcTaxi",
    country: "GH"
  }
  axios.get('https://api.nexmo.com/verify/json', {params:s})
  .then(function (response) {
   res.json({
     code: 200,
     data: response
   })
  })
  .catch(function (error) {
    res.json({
      code: 201,
      error: error
    })
  });
})



router.post('/verify', function (req, res) {
  var data = req.body;
  var s = {
    api_key: key,
    api_secret: secret,
    request_id: data.id,
    code: data.code,
    code_length: 4
  }
  axios.get('https://api.nexmo.com/verify/check/json', s)
  .then(function (response) {
    find('users',{phone: data.phone}, (err,doc)=>{
      if(err){
        insert('users', {phone: data.phone}, (err,data)=>{
          if(data){
            res.json({
              code: 200,
              data: data
            })
          }else{
            res.json({
              code: 201,
              err: err
            })
          }
        })
      }
    })
  
  })
  .catch(function (error) {
    res.json({
      code: 201,
      error: error
    })
  });
})



module.exports = router;