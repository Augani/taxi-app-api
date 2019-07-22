var express = require('express');
var router = express.Router();
const axios = require('axios');
const secret = "6TT9fwQPuD3sA8tx";
const key = "489e85b1";
const DB = require('../db');
const testKey = "e6942459";
const testSecret = "uCs1TfULvpAQjVEp";

const { findit, insert, update } = require('../db');


router.post('/login', function (req, res) {
  var data = req.body;
  var s = {
  api_key: key,
    api_secret: secret,
    number: data.phone,
    brand: "bcTaxi",
    country: "CA",
    code_length: 4
  }
  var r;
  axios.get('https://api.nexmo.com/verify/json', {params:s})
  .then(function (response) {
    r = response;
  })
  .catch(function (error) {
   
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
    if(response.data.price){
      findit('users',{phone: req.body.phone}, (err,doc)=>{
        if(!doc[0].phone){
          insert('users', {phone: req.body.phone}, (err,data)=>{
            console.log(data);
            if(data){
              res.json({
                code: 200,
                data: data
              })
            }else{
             
            }
          })
        }else{
          res.json({
            code: 205,
            data: doc[0],
            users: true
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