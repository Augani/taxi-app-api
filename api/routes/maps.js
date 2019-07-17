const {API_KEY} = require('../config')
var express = require('express');
var router = express.Router();
const DB = require('../db');
const Fares  = require('../models/fare');
const googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyAzb_EziNyxtjF5QChY7QVsvTXdpNoJBmI"
  });
  const mongo = require('mongodb').MongoClient;
var db = DB;




  function find (name, query, cb) {
    const coll = db.collection(name);
    coll.find(query).toArray(cb)
}

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

getFaresync = async ()=>{
    Fares.findOne({admin: 'set'}, (error, results)=>{
        console.log(results)
        if(!error){
            return results.perKm;
        }else{
           return null;
        }
    });
}

getFare = ()=>{
    return new Promise((resolve,reject)=>{
        find('admin-fare',{admin: 'set'}, function (err, docs) {
            if(err){
                reject(err)
            }else{
                resolve(docs);
            }
        });
    })
}


router.post('/getDirection', function(req,res){
    var data = req.body;
    data.departure_time = new Date();
    
     getFare().then(r=>{
        var fare = r[0].perKm;
          googleMapsClient.directions(data, (err, resp)=>{
        if(err){
            res.json({
                code: 201,
                message: err
            })
        }else{
            var distance = resp.json.routes[0].legs[0].distance.text;
            distance = distance.split(" ")[0];
            distance = parseFloat(distance);
            var calculatedFare = distance * fare;
            res.json({
                code: 200,
                data: resp,
                calc: calculatedFare
            })
        }
    })
        
     }).catch(e=>{
         console.log("e", e);
     })
   
   
})

module.exports = router;
