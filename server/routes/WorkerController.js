var express = require('express');
var router = express.Router();

var ws = require('../services/WorkerService');
const workerService = new ws();



/* *** GET METHODS *** */

router.get('/getOrders',(req, res) =>{
    workerService.getOrders((requests) =>{
        res.status(200).send(requests)
    })
});


/* *** POST METHODS *** */

router.post('/finishOrder', (req, res) => {
    if (req.body['workerID'] === undefined || req.body['workerID'] === '') {
        res.status(400).send("Worker ID must be defined");
        return;
    }
    if (req.body['orderID'] === undefined || req.body['orderID'] === '') {
        res.status(400).send("Order ID must be defined");
        return;
    }

    workerService.finishOrder({workerID: req.body['workerID'], orderID: req.body['orderID']},
        () => {res.status(200).send("Mark order as finished")},
        (cause) => {res.status(400).send(cause)})
});



module.exports = router;