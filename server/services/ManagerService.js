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

ManagerService.prototype.createInvoice = function (request, success, error) {
    request['date'] = new Date().toISOString();
    request['state'] = new md5().update(JSON.stringify({
        orders: request['orderID'],
    })).digest('hex');
    request['invoice'] = new md5().update(JSON.stringify({
        date: request['date']
    })).digest('hex');

    this.managerDAO.createInvoice(request, ()=>{success()}, (cause) => {error(cause)})
};


ManagerService.prototype.listOrders = function(callback){
    this.managerDAO.readOrders((requests) => {callback(requests)})
};


ManagerService.prototype.listCustomers = function(callback){
    this.managerDAO.readCustomers((requests) => {callback(requests)})
};

ManagerService.prototype.getWorkers = function(callback){
    this.managerDAO.readAllWorkers((requests) => {callback(requests)})
};



module.exports = ManagerService;