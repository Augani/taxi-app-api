const {API_KEY} = require('../config')
var express = require('express');
var router = express.Router();
const googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyAzb_EziNyxtjF5QChY7QVsvTXdpNoJBmI"
  });

// Home page route.
router.post('/autocomp', function (req, res) {
  var data = req.body;


  googleMapsClient.placesAutoComplete({
      input: data.input,
      location: data.location,
      sessiontoken: "98h98hy898h879h",
      radius: 500
  },(err, resp)=>{
      if(err){
          console.log(err);
          res.json({
              code: 300,
              data: [],
              message: err
          })
          return;
      }else{
          res.json({
              code: 200,
              data: resp.json.predictions
          })
          console.log(resp)
      }
  })
})

module.exports = router;
