const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://172.21.0.10:27017';
const dbName = 'shutter-shop';

const customerDatabase = 'customerDatabase';
const orderDatabase = 'orderDatabase';
const workerDatabase = 'workerDatabase';




/* *** GET METHODS *** */

function getCustomers(findParams, callback){
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

function getAllCustomers(callback){
    getCustomers({},(result) => {callback(result)})
}


function getWorkers(findParams, callback){
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

function getAllWorkers(callback){
    getWorkers({},(result) => {callback(result)})
}


/* *** POST METHODS *** */

function assignOrder(request, success, error) {
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
                            state: 'pending'
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

function postInvoice(request, success, error) {
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
    "assignOrder" : assignOrder,
    "postInvoice" : postInvoice,
    "getCustomers" : getAllCustomers,
    "getWorkers" : getAllWorkers
};