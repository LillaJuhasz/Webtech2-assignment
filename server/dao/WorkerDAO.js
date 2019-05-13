const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://172.21.0.10:27017';
const dbName = 'shutter-shop';

const orderDatabase = 'orderDatabase';


function getPendingOrders(request, callback) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderDatabase);

        collection.find({ $or: [ { workerID: false }, { workerID: request['workerID'] } ] }).toArray((err, docs) => {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();

    })
}

function markOrderAsPacked(request, success, error) {
    var client = new MongoClient(url);
    client.connect((err)=> {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection(orderDatabase);

        collection.findOne({orderID: request['orderID']}, (err, docs) => {
            assert.equal(null, err);
            if (docs.workerID !== request['workerID']) {
                error('Error: order is not assigned to the given worker');
                client.close();
            } else if (docs.state === 'finished') {
                error('Error: order is already packaged');
                client.close();
            } else {
                collection.updateOne({orderID: request['orderID']},
                    {
                        $set: {
                            state: 'finished'
                        }
                    }, (err,res)=>{
                        assert.equal(null, err);

                        success(res)
                    });
                client.close();
            }

        })

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

function readOrdersByID(orderID,callback){
    readOrders({"orderID" : orderID},(result) => {callback(result)})
}



module.exports = {
    "getPendingOrders": getPendingOrders,
    "markOrderAsPacked": markOrderAsPacked,
    "readOrders": readAllOrders,
    "readOrdersByID" : readOrdersByID
};