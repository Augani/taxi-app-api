const mongo = require('mongodb').MongoClient;
const urlTest = "mongodb://localhost:27017";
const stagingurl = "'mongodb+srv://nii:0277427898@taxi-lvqnv.mongodb.net/taxi?retryWrites=true&w=majority'";


exports.findit = (name, query, cb)=>{
    mongo.connect(stagingurl, (err, client) => {
        var db = client.db('taxi');
        if (err) {
            return cb("err", null);
        }
        const coll = db.collection(name);
        coll.find(query).toArray(cb);
        client.close();
    });
}

exports.insert = (name, data, cb)=> {
    mongo.connect(stagingurl, (err, client) => {
        var db = client.db('taxi');
        if (err) {
            return cb("err", null);
        }
        const coll = db.collection(name);
        coll.insertOne(data, cb);
        client.close();
    });
};

exports.update = (name, cond, data, cb)=> {
    mongo.connect(stagingurl, (err, client) => {
        var db = client.db('taxi');
        if (err) {
            return cb("err", null);
        }
        const coll = db.collection(name);
        coll.updateOne({
            phone: cond
        }, {
            '$set': data
        }, cb);
        client.close();
    });
};