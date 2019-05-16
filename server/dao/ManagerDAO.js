const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'shutter-shop';

const customerDatabase = 'customerDatabase';
const orderDatabase = 'orderDatabase';
const workerDatabase = 'workerDatabase';


function assignOrderToWorker(request, success, error) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderDatabase);

        collection.findOne({orderID: request['orderID']}, (err, docs) => {
            assert.equal(null, err);
            if (docs.workerID !== undefined) {
                error('Error: order is already assigned to a worker');
            } else {
                collection.updateOne({orderID: request['orderID']},
                    {
                        $set: {
                            workerID: request['workerID'],
                            state: 'inprogress'
                        }
                    }, (err,res)=>{
                        assert.equal(null, err);
                        success(res)
                    });
            }
            client.close();
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

function readCustomers(findParams, callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(customerDatabase);

        collection.find(findParams).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

function readAllCustomers(callback){
    readCustomers({},(result) => {callback(result)})
}

function readCustomer(customerID,callback){
    readCustomers({"customerID" : customerID},(result) => {callback(result)})
}

function readWorkers(findParams, callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(workerDatabase);

        collection.find(findParams).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

function readAllWorkers(callback){
    readWorkers({},(result) => {callback(result)})
}

function readWorker(customerID,callback){
    readWorkers({"customerID" : customerID},(result) => {callback(result)})
}

function createInvoice(request, success, error) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderDatabase);
        console.log(request['orderID']);
        collection.findOne({orderID: request['orderID']}, (err, docs) => {

            assert.equal(null, err);
            if (docs.state !== 'finished') {
                error('Error: order is not finished yet.');
                client.close();
            } else {
                collection.updateOne({orderID: request['orderID']},
                    {
                        $set: {
                            state: 'payed',
                            invoice: request['date']
                        }
                    }, (err,res)=>{
                        assert.equal(null, err);
                        success(res)
                    });
                client.close();
            }

        });

    })
}



module.exports = {
    "assignOrderToWorker" : assignOrderToWorker,
    "readOrders" : readAllOrders,
    "readOrdersOfCustomer" : readOrdersOfCustomer,
    "readCustomers" : readAllCustomers,
    "readCustomer" : readCustomer,
    "createInvoice" : createInvoice,
    "readAllWorkers" : readAllWorkers,
    "readWorker": readWorker
};