var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 8080;

const customerController = require('./routes/CustomerController');
const workerController = require('./routes/WorkerController');
const managerController = require('./routes/ManagerController');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/customer', customerController);
app.use('/api/worker', workerController);
app.use('/api/manager', managerController);

app.listen(8080, function(){ console.log("Server listens on 8080.") });
