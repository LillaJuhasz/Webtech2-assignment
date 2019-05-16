var express = require('express');
var router = express.Router();

var ws = require('../services/WorkerService');
const workerService = new ws();



/* *** POST METHODS *** */

router.post('/finishOrder', (req, res) => {
    if (req.body['workerID'] === undefined || req.body['workerID'] === '') {
        res.status(400).send("Worker id must be defined");
        return;
    }
    if (req.body['orderID'] === undefined || req.body['orderID'] === '') {
        res.status(400).send("Order id must be defined");
        return;
    }

    workerService.markOrder({workerID: req.body['workerID'], orderID: req.body['orderID']},
        () => {res.status(200).send("Mark order as finished")},
        (cause) => {res.status(400).send(cause)})
});


/* *** GET METHODS *** */

router.get('/listOrderByID',(req,res) =>{
    workerService.listOrders((requests) =>{
        res.status(200).send(requests)
    })
});



module.exports = router;