const {
    API_KEY
} = require('../config');
var express = require('express');
const axios = require('axios');
var router = express.Router();
const DB = require('../db');
const IMGBBKEy = "e95ebcac3ea49a5d849f4c753f1fb597";
const FormData = require('form-data');
const Fares = require('../models/fare');
const googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyAzb_EziNyxtjF5QChY7QVsvTXdpNoJBmI"
});

var fs = require('fs');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});

const { findit, insert, update } = require('../db');



// function findit(name, query, cb) {
//     mongo.connect(urlTest, (err, client) => {
//         var db = client.db('taxi');
//         if (err) {
//             return cb("err", null);
//         }
//         const coll = db.collection(name);
//         coll.find(query).toArray(cb);
//         client.close();
//     });

// }

// function insert(name, data, cb) {
//     mongo.connect(urlTest, (err, client) => {
//         var db = client.db('taxi');
//         if (err) {
//             return cb("err", null);
//         }
//         const coll = db.collection(name);
//         coll.insertOne(data, cb);
//         client.close();
//     });

// }

// function update(name, cond, data, cb) {
//     mongo.connect(urlTest, (err, client) => {
//         var db = client.db('taxi');
//         if (err) {
//             return cb("err", null);
//         }
//         const coll = db.collection(name);
//         coll.updateOne({
//             phone: cond
//         }, {
//             '$set': data
//         }, cb);
//         client.close();
//     })

// }


router.post('/uploadImage', upload.single('fileData'), (req, res, next) => {
    fs.readFile(req.file.path, (err, contents) => {
        if (err) {
        } else {

            let data = fs.createReadStream(req.file.path);
            let form = new FormData();
            form.append('key', IMGBBKEy);
            form.append('image', data);


            function getHeaders(form) {
                return new Promise((resolve, reject) => {
                    form.getLength((err, length) => {
                        if (err) {
                            reject(err);
                        }
                        let headers = Object.assign({
                            'Content-Length': length
                        }, form.getHeaders());
                        resolve(headers);
                    });
                });
            }

            var dt = '';

            getHeaders(form)
                .then((headers) => {
                    return axios.post("https://api.imgbb.com/1/upload", form, {
                        headers: headers
                    });
                })
                .then((response) => {
                 
                    findit('driverImages',{phone: req.body.phone},(err,data)=>{
                     
                        var t = [];

                        if(!data.length){
                            t.push(response.data.data.url);
                            insert('driverImages', {phone: req.body.phone, images: t});
                            res.json({
                                data: response.data
                            });
                        }else{
                            var imagesf = data[0].images;
                            imagesf.push(response.data.data.url);
                            update('driverImages', req.body.phone, {images: imagesf});
                            res.json({
                                data: response.data
                            });
                        }
                    })
                    

                }).catch(e=>{
                }).finally(()=>{
                    try{
                        fs.unlinkSync(req.file.path);
    
                    }catch(e){
                    }
                })

               
        }
    });




});




router.post('/register/', (req, res) => {
    var data = req.body;

    update('users', data.phone, data, (err, doc) => {
        if (err) {
            res.json({
                code: 201,
                data: null,
                message: err
            });
        } else {
            res.json({
                code: 200,
                data: doc,
            });
        }
    });
});

router.post('/update/', (req, res) => {
    var data = req.body;

    update('users', data.phone, data, (err, doc) => {
        if (err) {
            res.json({
                code: 201,
                data: null,
                message: err
            });
        } else {
            res.json({
                code: 200,
                data: doc,
            });
        }
    });
});

router.post('/login/', (req, res) => {
    var data = req.body;


})




router.get('/getriders', (req, res) => {
    findit('users', {
        userType: 1
    }, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getrides', (req, res) => {
    findit('rides', {}, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getOngoingRides', (req, res) => {
    findit('rides', {
        enroute: true
    }, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
});

router.get('/getdriverapps', (req, res) => {
    findit('users', {
        userType: 2,
        approved: false
    }, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.post('/approvedriver', (req, res) => {
    findit('users', {
        userType: 2,
        approved: true
    }, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getdriver/:id', (req, res) => {
    var id = req.params.id;
    findit('users', {
        userType: 2,
        _id: id
    }, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getrider/:id', (req, res) => {
    var id = req.params.id;
    findit('users', {
        userType: 1,
        _id: id
    }, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})


router.get('/getrides/:id', (req, res) => {
    var id = req.params.id;
    findit('rides', {
        _id: id
    }, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})

router.get('/getriders/:region', (req, res) => {
    var region = req.params.region;
    findit('users', {
        userType: 1,
        region: region
    }, (err, doc) => {
        if (doc) {
            res.json({
                code: 200,
                data: doc
            })
        } else {

            res.json({
                code: 201,
                data: null,
                err: err
            })
        }
    })
})


module.exports = router;