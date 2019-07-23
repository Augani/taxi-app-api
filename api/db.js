const mongo = require('mongodb').MongoClient;
const urlTest = "mongodb://localhost:27017";
const stagingurl = "'mongodb+srv://niiy:0277427898@taxi-lvqnv.mongodb.net/taxi?retryWrites=true&w=majority'";


var theDb = null;

exports.initMain = function(){
    mongo.connect(stagingurl, (err, client)=>{
        console.log(err,client);
        theDb =  client.db('taxi');
        console.log('connected');
    });
}


exports.findit = (name, query, cb)=>{
    // mongo.connect(stagingurl, (err, client) => {
    //     var db = client.db('taxi');
    //     if (err) {
    //         return cb("err", null);
    //     }
    //     const coll = theDb.collection(name);
    //     coll.find(query).toArray(cb);
    //     client.close();
    // });
    const coll = theDb.collection(name);
        coll.find(query).toArray(cb);
        // client.close();
}

exports.insert = (name, data, cb)=> {
    // mongo.connect(stagingurl, (err, client) => {
    //     var db = client.db('taxi');
    //     if (err) {
    //         return cb("err", null);
    //     }
    //     const coll = theDb.collection(name);
    //     coll.insertOne(data, cb);
    //     client.close();
    // });
    const coll = theDb.collection(name);
    coll.insertOne(data, cb);
    // client.close();
};

exports.update = (name, cond, data, cb)=> {
    // mongo.connect(stagingurl, (err, client) => {
    //     var db = client.db('taxi');
    //     if (err) {
    //         return cb("err", null);
    //     }
    //     const coll = theDb.collection(name);
    //     coll.updateOne({
    //        cond
    //     }, {
    //         '$set': data
    //     }, cb);
    //     client.close();
    // });
    const coll = theDb.collection(name);
    coll.updateOne({
       cond
    }, {
        '$set': data
    }, cb);
    // client.close();
};