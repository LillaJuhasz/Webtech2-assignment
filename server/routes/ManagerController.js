var express = require('express');
var router = express.Router();

var ms = require('../services/ManagerService');
const managerService = new ms();



/* *** GET METHODS *** */

router.get('/getCustomers',(req,res) =>{
    managerService.getCustomers((requests) =>{
        res.status(200).send(requests)
    })
});

router.get('/getWorkers',(req,res) =>{
    managerService.getWorkers((requests) =>{
        res.status(200).send(requests)
    })
});


/* *** POST METHODS *** */

router.post('/assignOrder', (req, res) => {
    if (req.body['workerID'] === undefined || req.body['workerID'] === '') {
        res.status(400).send("Worker ID must be defined");
        return;
    }
    if (req.body['orderID'] === undefined || req.body['orderID'] === '') {
        res.status(400).send("Order ID must be defined");
        return;
    }

    managerService.assignOrder({workerID: req.body['workerID'], orderID: req.body['orderID']},
        () => {res.status(200).send("Order assigned to worker")},
        (cause) => {res.status(400).send(cause)})
});


router.post('/postInvoice', (req, res) => {
    if (req.body['orderID'] === undefined || req.body['orderID'] === '') {
        res.status(400).send("Order ID must be defined");
        return;
    }

    managerService.postInvoice({orderID: req.body['orderID'], shutterID: req.body['shutter']},
        () => {res.status(200).send("Invoice created")},
        (cause) => {res.status(400).send(cause)})
});



module.exports = router;