const {API_KEY} = require('../config');
var express = require('express');
var router = express.Router();
const DB = require('../db');
const Fares  = require('../models/fare');
const googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyAzb_EziNyxtjF5QChY7QVsvTXdpNoJBmI"
  });
  

  const mongo = require('mongodb').MongoClient;
  const urlTest = "mongodb://localhost:27017";
  
  // const db = mongo.connect(urlTest, (err, client) => {
  //     if (err) {
  //       console.error(err)
  //       return
  //     }
  //     //...
  //     console.log('db connected');
  
  //     return client;
      
      
  //   })
  const apikey = 'A76GDi3qSRQC4bBHDlf9Mz';

  const client = require('filestack-js').init(apikey);
  
  const token = {};

  const onProgress = (evt) => {
    console.log('Progress: ' + evt.totalPercent);
  };

  var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }); 

//setting the default folder for multer
//other imports and code will go here
router.post('/uploadImage',upload.single('fileData'), (req, res,next) => {
      fs.readFile(req.file.path,(err, contents)=> {
   if (err) {
   console.log('Error: ', err);
  }else{
   console.log('File contents ',contents);
  }
 });
    client.upload(req.file.path, { onProgress }, {}, token)
  .then(results => {
   res.json({
       code: 201,
       data: results
   });
  })
  .catch(err => {
   res.json({
       code: 301,
       error: err
   });
});

});
  
  
  
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
router.post('/register/', (req,res)=>{
        var data = req.body;

        update('users', data.phone, data, (err, doc)=>{
            if(err){
                res.json({
                    code: 201,
                    data: null,
                    message: err
                });
            }else{
                res.json({
                    code: 200,
                    data: doc,
                });
            }
        } );
});

router.post('/update/', (req,res)=>{
    var data = req.body;

    update('users', data.phone, data, (err, doc)=>{
        if(err){
            res.json({
                code: 201,
                data: null,
                message: err
            });
        }else{
            res.json({
                code: 200,
                data: doc,
            });
        }
    } );
});

router.post('/login/', (req,res)=>{
    var data = req.body;

   
})




router.get('/getriders', (req,res)=>{
    findit('users', {userType: 1}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getrides', (req,res)=>{
    findit('rides',{}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getOngoingRides', (req,res)=>{
    findit('rides', {enroute: true}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
});

router.get('/getdriverapps', (req,res)=>{
    findit('users', {userType: 2, approved: false}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.post('/approvedriver', (req,res)=>{
    findit('users', {userType: 2, approved: true}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getdriver/:id', (req,res)=>{
    var id = req.params.id;
    findit('users', {userType: 2, _id: id}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getrider/:id', (req,res)=>{
    var id = req.params.id;
    findit('users', {userType: 1, _id: id}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})


router.get('/getrides/:id', (req,res)=>{
    var id = req.params.id;
    findit('rides', {_id: id}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getriders/:region', (req,res)=>{
    var region = req.params.region;
    findit('users', {userType: 1, region: region}, (err,doc)=>{
        if(doc){
            res.json({
                code: 200,
                data: doc
            })
        }else{
            
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})


module.exports = router;
