var express = require('express');
var router = express.Router();

var cs = require('../services/CustomerService');
const customerService = new cs();



/* *** GET METHODS *** */

router.get('/getShutters',(req,res) =>{
    customerService.getShutters((requests) =>{
        res.status(200).send(requests)
    })
});


/* *** POST METHODS *** */

router.post('/postCustomer', (req, res) => {
    if ( req.body['firstName'] === undefined || req.body['firstName'] ==='') {
        res.status(414).send('First name must be defined');
        return;
    }
    if ( req.body['lastName'] === undefined || req.body['lastName'] ==='') {
        res.status(414).send('Last name must be defined');
        return;
    }
    if ( req.body['address'] === undefined || req.body['address'] ==='') {
        res.status(414).send('Address must be defined');
        return;
    }
    if ( req.body['email'] === undefined || req.body['email'] ==='') {
        res.status(414).send('E-mail must be defined');
        return;
    }

    customerService.postCustomer({
            customerID: req.body['customerID'],
            firstName:req.body['firstName'],
            lastName: req.body['lastName'],
            address: req.body['address'],
            email: req.body['email']},
        () => {res.status(200).send("Customer created")},
        (cause) => {res.status(400).send(cause)})
});


router.post('/postOrder', (req, res) => {
    if ( req.body['windowWidth'] === undefined || req.body['windowWidth'] ==='') {
        res.status(414).send('Window width must be defined');
        return;
    }
    if ( req.body['windowHeight'] === undefined || req.body['windowHeight'] ==='') {
        res.status(414).send('Window height must be defined');
        return;
    }
    if ( req.body['shutter'] === undefined || req.body['shutter'] ==='') {
        res.status(414).send('Shutter must be defined');
        return;
    }
    customerService.postOrder({
            orderID: req.body['orderID'],
            customerID: req.body['customerID'],
            windowWidth: req.body['windowWidth'],
            windowHeight: req.body['windowHeight'],
            shutter: req.body['shutter'],
            state: 'waiting'},
        () => {res.status(200).send('Order placed')},
        (cause) => res.status(400).send(cause))
});



module.exports = router;