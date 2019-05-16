const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'shutter-shop';
const customerDatabase = 'customerDatabase';
const orderDatabase = 'orderDatabase';
const shutterDatabase = 'shutterDatabase';



function createCustomer(request, callback) {
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

function readCustomer(findParam, callback) {
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(customerDatabase);

        collection.findOne({customerID: findParam}, (err, docs) => {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}


function createOrder(request, callback) {
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

function readOrders(findParams, callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(orderDatabase);

        collection.find(findParams).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

function readAllOrders(callback){
    readOrders({},(result) => {callback(result)})
}

function readOrdersOfCustomer(customerID,callback){
    readOrders({"customerID" : customerID},(result) => {callback(result)})
}


function readShutters(findParams, callback) {
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

function readAllShutters(callback){
    readShutters({},(result) => {callback(result)})
}

function readShutterById(shutterID,callback){
    readShutters({"shutterID" : shutterID},(result) => {callback(result)})
}


module.exports = {
    "createCustomer": createCustomer,
    "readCustomer" : readCustomer,
    "readOrders": readAllOrders,
    "readOrdersOfCustomer" : readOrdersOfCustomer,
    "createOrder" : createOrder,
    "readShutterById": readShutterById,
    "readShutters" : readAllShutters
};