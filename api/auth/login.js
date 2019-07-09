var express = require('express');
var router = express.Router();
const axios = require('axios');
const secret = "6TT9fwQPuD3sA8tx";
const key = "489e85b1";

const testKey = "e6942459";
const testSecret = "uCs1TfULvpAQjVEp";

router.get('/login', function (req, res) {
  var data = req.body;
  var s = {
    api_key: testKey,
    api_secret: testSecret,
    number: data.phone,
    brand: bcTaxi
  }
  axios.get('https://api.nexmo.com/verify/json', s)
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


router.get('/verify', function (req, res) {
  var data = req.body;
  var s = {
    api_key: key,
    api_secret: secret,
    request_id: data.id,
    code: data.code
  }
  axios.get('https://api.nexmo.com/verify/check/json', s)
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



module.exports = router;