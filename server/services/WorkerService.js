function WorkerService(workerDAO) {
    // logger
    md5 = require('md5.js');

    if (workerDAO !== undefined && workerDAO != null) {
        this.workerDAO = workerDAO;
    } else {
        this.workerDAO = require('../dao/WorkerDAO');
    }
}

WorkerService.prototype.listPendingOrders = function (request, success, error) {
    this.workerDAO.getPendingOrders(request, (orders)=>{success(orders)})
};


WorkerService.prototype.markOrder = function (request, success, error) {
    request['state'] = new md5().update(JSON.stringify({
        workers: request['workerID'],
        orders: request['orderID'],
    })).digest('hex');

    this.workerDAO.markOrderAsPacked(request, ()=>{success()}, (cause) => {error(cause)})
};


WorkerService.prototype.listOrders = function(callback){
    this.workerDAO.readOrders((requests) => {callback(requests)})
};

WorkerService.prototype.listOrdersByID = function(orderID, callback){
    this.workerDAO.readOrdersByID(orderID, (requests) =>{callback(requests)})
};



module.exports = WorkerService;