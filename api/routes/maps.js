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


router.post('/getfare', function(req, res){
    var data = req.body;

    
})


router.post('/getCountry', function(req,res){
    var data = req.body;

    googleMapsClient.reverseGeocode(data, (err, resp)=>{
        if(err){
            res.json({
                code: 201,
                message: err
            })
        }else{
            res.json({
                code: 200,
                data: resp
            })
        }
    })
})


router.post('/getDirection', function(req,res){
    var data = req.body;
    data.departure_time = new Date();
    googleMapsClient.directions(data, (err, resp)=>{
        if(err){
            res.json({
                code: 201,
                message: err
            })
        }else{
            res.json({
                code: 200,
                data: resp
            })
        }
    })
})

module.exports = router;
