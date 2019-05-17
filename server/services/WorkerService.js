function WorkerService(workerDAO) {
    md5 = require('md5.js');

    if (workerDAO !== undefined && workerDAO != null) {
        this.workerDAO = workerDAO;
    } else {
        this.workerDAO = require('../dao/WorkerDAO');
    }
}



/* *** GET METHODS *** */

WorkerService.prototype.getOrders = function(callback){
    this.workerDAO.getOrders((requests) => {callback(requests)})
};


/* *** POST METHODS *** */

WorkerService.prototype.finishOrder = function (request, success, error) {
    request['state'] = new md5().update(JSON.stringify({
        workers: request['workerID'],
        orders: request['orderID'],
    })).digest('hex');

    this.workerDAO.finishOrder(request, ()=>{success()}, (cause) => {error(cause)})
};



module.exports = WorkerService;