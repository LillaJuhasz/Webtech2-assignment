var express = require('express');
var router = express.Router();

var srs = require('../services/CustomerService');
const customerService = new srs();



/* *** POST METHODS *** */

router.post('/newCustomer', (req, res) => {
    if ( req.body['customerID'] === undefined || req.body['customerID'] ==='') {
        res.status(414).send('Customer ID must be defined');
        return;
    }
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
        res.status(414).send('Email must be defined');
        return;
    }
    customerService.createCustomer({
            customerID: req.body['customerID'],
            firstName:req.body['firstName'],
            lastName: req.body['lastName'],
            address: req.body['address'],
            email: req.body['email']},
        () => {res.status(200).send("Customer created")},
        (cause) => {res.status(400).send(cause)})
});


router.post('/newOrder', (req, res) => {
    if ( req.body['orderID'] === undefined || req.body['orderID'] ==='') {
        res.status(414).send('Order must be defined');
        return;
    }
    if ( req.body['customerID'] === undefined || req.body['customerID'] ==='') {
        res.status(414).send('Customer id must be defined');
        return;
    }
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
    customerService.createOrder({
            orderID: req.body['orderID'],
            customerID: req.body['customerID'],
            windowWidth: req.body['windowWidth'],
            windowHeight: req.body['windowHeight'],
            shutter: req.body['shutter'],
            state: 'waiting'},
        () => {res.status(200).send('Order placed')},
        (cause) => res.status(400).send(cause))
});


/* *** GET METHODS *** */

router.get('/listShutters',(req,res) =>{
    customerService.getShutters((requests) =>{
        res.status(200).send(requests)
    })
});



module.exports = router;