const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://172.21.0.10:27017';
const dbName = 'shutter-shop';
const customerDatabase = 'customerDatabase';
const orderDatabase = 'orderDatabase';
const shutterDatabase = 'shutterDatabase';



/* *** GET METHODS *** */

function getShutters(findParams, callback) {
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(shutterDatabase);

        collection.find(findParams).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

function getAllShutters(callback){
    getShutters({},(result) => {callback(result)})
}


/* *** POST METHODS *** */

function postCustomer(request, callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(customerDatabase);

        collection.insertOne(request, (err, res) => {
            assert.equal(null, err);
            assert.equal(1, res.insertedCount);
            client.close();
            callback()
        })
    })
}

function postOrder(request, callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderDatabase);

        collection.insertOne(request, (err, res) => {
            assert.equal(null, err);
            assert.equal(1, res.insertedCount);
            client.close();
            callback()
        });
    })
}



module.exports = {
    "postCustomer": postCustomer,
    "postOrder" : postOrder,
    "getShutters" : getAllShutters
};