var express = require('express');
var router = express.Router();
const axios = require('axios');
const secret = "6TT9fwQPuD3sA8tx";
const key = "489e85b1";
const DB = require('../db');
const testKey = "e6942459";
const testSecret = "uCs1TfULvpAQjVEp";
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'e6942459',
  apiSecret: 'uCs1TfULvpAQjVEp',
});

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

  var code = getRandom(4);
  const from = 'BcTaxi';
  const to = "233"+data.phone;
  const text = "Your verification code to login is " +code;

  nexmo.message.sendSms(from, to, text);

  insert('codeverify', {
    phone: data.phone,
    code: code,
    verified: false
  }, (err,doc)=>{
    if(err){
      console.log(err);
      res.json({
        error: err
      });
    }

    if(doc){
      res.json({
        code: 200,
        data: doc,
        message: "Success"
      });
    }
  })
  
})

function getRandom(length) {

  return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  
  }



router.post('/verify', function (req, res) {
  var data = req.body;

  findit('codeverify', {phone: data.phone}, (err,doc)=>{
    if(err){
      res.json({
        error: err
      })
    }

    if(doc){
     
     var code = doc[0].code;
     if(code == data.code){
       update('codeverify', {_id: data.id}, {verified: true}, (err, doc)=>{
        if(err){
          res.json({
            error: err
          });
        }
        
        if(doc){
          res.json({
            code: 200,
            data: doc
          });
        }
       });
     }else{
       res.json({
         error: "Wrong code"
       });
     }
    }
  })
  
})



module.exports = router;