const {API_KEY} = require('../config')
var express = require('express');
var router = express.Router();
const Fares  = require('../models/fare');
const googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyAzb_EziNyxtjF5QChY7QVsvTXdpNoJBmI"
  });
  const mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/taxi?retryWrites=true&w=majority';
var db;
mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    //...
    console.log('connected');

    db =  client.db('test');
    
  })



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

router.post('/register/', (req,res)=>{
        var data = req.body;

        update('users', data.phone, data, (err, doc)=>{
            if(err){
                res.json({
                    code: 201,
                    data: null,
                    message: err
                })
            }else{
                res.json({
                    code: 200,
                    data: doc,
                })
            }
        } )
})

router.post('/login/', (req,res)=>{
    var data = req.body;

   
})




router.get('/getriders', (req,res)=>{
    find('users', {userType: 1}, (err,doc)=>{
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
    find('rides',{}, (err,doc)=>{
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
    find('rides', {enroute: true}, (err,doc)=>{
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
    find('users', {userType: 2, approved: false}, (err,doc)=>{
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
    find('users', {userType: 2, approved: true}, (err,doc)=>{
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
    find('users', {userType: 2, _id: id}, (err,doc)=>{
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
    find('users', {userType: 1, _id: id}, (err,doc)=>{
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
    find('rides', {_id: id}, (err,doc)=>{
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
    find('users', {userType: 1, region: region}, (err,doc)=>{
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
