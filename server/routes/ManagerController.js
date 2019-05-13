var express = require('express');
var router = express.Router();

var ms = require('../services/ManagerService');
const managerService = new ms();


router.post('/assignOrder', (req, res) => {
    if (req.body['workerID'] === undefined || req.body['workerID'] === '') {
        res.status(400).send("Worker id must be defined");
        return;
    }
    if (req.body['orderID'] === undefined || req.body['orderID'] === '') {
        res.status(400).send("Order id must be defined");
        return;
    }

    managerService.assignOrder({workerID: req.body['workerID'], orderID: req.body['orderID']},
        () => {res.status(200).send("Order assigned to worker")},
        (cause) => {res.status(400).send(cause)})
});

router.get('/listOrders',(req,res) =>{
    if(req.query['customerID'] !== undefined){

        managerService.listOrdersOfCustomer(parseInt(req.query['customerID']), (requests)=>{
            res.status(200).send(requests)
        });
        return;
    }
    managerService.listOrders((requests) =>{
        res.status(200).send(requests)
    })
});

router.get('/listCustomers',(req,res) =>{
    if(req.query['customerID'] !== undefined){

        managerService.listCustomer(parseInt(req.query['customerID']), (requests)=>{
            res.status(200).send(requests)
        });
        return;
    }
    managerService.listCustomers((requests) =>{
        res.status(200).send(requests)
    })
});

router.get('/listWorkers',(req,res) =>{
    if(req.query['workerID'] !== undefined){

        managerService.getWorker(parseInt(req.query['workerID']), (requests)=>{
            res.status(200).send(requests)
        });
        return;
    }
    managerService.getWorkers((requests) =>{
        res.status(200).send(requests)
    })
});

router.post('/createInvoice', (req, res) => {
    if (req.body['orderID'] === undefined || req.body['orderID'] === '') {
        res.status(400).send("Order id must be defined");
        return;
    }

    managerService.createInvoice({orderID: req.body['orderID']},
        () => {res.status(200).send("Invoice created.")},
        (cause) => {res.status(400).send(cause)})
});



module.exports = router;