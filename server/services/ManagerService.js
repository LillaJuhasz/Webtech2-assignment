function ManagerService(managerDAO) {
    md5 = require('md5.js');

    if (managerDAO !== undefined && managerDAO != null) {
        this.managerDAO = managerDAO;
    } else {
        this.managerDAO = require('../dao/ManagerDAO');
    }
}



/* *** GET METHODS *** */

ManagerService.prototype.getCustomers = function(callback){
    this.managerDAO.getCustomers((requests) => {callback(requests)})
};

ManagerService.prototype.getWorkers = function(callback){
    this.managerDAO.getWorkers((requests) => {callback(requests)})
};


/* *** POST METHODS *** */

ManagerService.prototype.assignOrder = function (request, success, error) {
    request['state'] = new md5().update(JSON.stringify({
        workers: request['workerID'],
        orders: request['orderID'],
    })).digest('hex');

    this.managerDAO.assignOrder(request, ()=>{success()}, (cause) => {error(cause)})
};

ManagerService.prototype.postInvoice = function (request, success, error) {
    request['date'] = new Date().toISOString();
    request['state'] = new md5().update(JSON.stringify({
        orders: request['orderID'],
    })).digest('hex');
    request['invoice'] = new md5().update(JSON.stringify({
        date: request['date']
    })).digest('hex');

    this.managerDAO.postInvoice(request, ()=>{success()}, (cause) => {error(cause)})
};



module.exports = ManagerService;