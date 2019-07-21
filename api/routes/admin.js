const {API_KEY} = require('../config')
var express = require('express');
var router = express.Router();
const DB = require('../db');
const Fares  = require('../models/fare');
const googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyAzb_EziNyxtjF5QChY7QVsvTXdpNoJBmI"
  });
  const { findit, insert, update } = require('../db');


router.get('/getdrivers', (req,res)=>{
    findit('users', {userType: 2}, (err,doc)=>{
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

router.get('/getUsers', (req,res)=>{
    findit('users', {}, (err,doc)=>{
        if(doc){
            var riders = doc.findit(function (obj) { return obj.userType === 1; });
            var drivers = doc.findit(function (obj) { return obj.userType === 2; });
            
            res.json({
                code: 200,
                data: doc,
                riders: riders,
                drivers: drivers,
                noOfRiders: riders.length,
                noOfDrivers: drivers.length

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
