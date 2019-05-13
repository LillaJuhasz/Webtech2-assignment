function ManagerService(managerDAO) {
    // logger
    md5 = require('md5.js');

    if (managerDAO !== undefined && managerDAO != null) {
        this.managerDAO = managerDAO;
    } else {
        this.managerDAO = require('../dao/ManagerDAO');
    }
}

ManagerService.prototype.assignOrder = function (request, success, error) {
    request['state'] = new md5().update(JSON.stringify({
        workers: request['workerID'],
        orders: request['orderID'],
    })).digest('hex');

    this.managerDAO.assignOrderToWorker(request, ()=>{success()}, (cause) => {error(cause)})
};

ManagerService.prototype.listOrders = function(callback){
    this.managerDAO.readOrders((requests) => {callback(requests)})
};

ManagerService.prototype.listOrdersOfCustomer = function(customerID, callback){
    this.managerDAO.readOrdersOfCustomer(customerID, (requests) =>{callback(requests)})
};

ManagerService.prototype.listCustomers = function(callback){
    this.managerDAO.readCustomers((requests) => {callback(requests)})
};

ManagerService.prototype.listCustomer = function(customerID, callback){
    this.managerDAO.readCustomer(customerID, (requests) =>{callback(requests)})
};

ManagerService.prototype.getWorkers = function(callback){
    this.managerDAO.readAllWorkers((requests) => {callback(requests)})
};

ManagerService.prototype.getWorker = function(customerID, callback){
    this.managerDAO.readWorker(customerID, (requests) =>{callback(requests)})
};

ManagerService.prototype.createInvoice = function (request, success, error) {
    request['state'] = new md5().update(JSON.stringify({
        orders: request['orderID']
    })).digest('hex');

    this.managerDAO.createInvoice(request, ()=>{success()}, (cause) => {error(cause)})
};

module.exports = ManagerService;