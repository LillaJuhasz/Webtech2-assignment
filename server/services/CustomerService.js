function CustomerService(customerDAO) {
    md5 = require('md5.js');

    if (customerDAO !== undefined && customerDAO != null) {
        this.customerDAO = customerDAO;
    } else {
        this.customerDAO = require('../dao/CustomerDAO');
    }
}


/* *** GET METHODS *** */

CustomerService.prototype.getShutters = function(callback){
    this.customerDAO.getShutters((requests) => {callback(requests)})
};


/* *** POST METHODS *** */

CustomerService.prototype.postCustomer = function (request, callback, error) {
    this.customerDAO.postCustomer(request, ()=>{callback()}, (cause) => {error(cause)})
};

CustomerService.prototype.postOrder = function (request, callback, error) {
    this.customerDAO.postOrder(request, ()=>{callback()}, (cause) => {error(cause)})
};



module.exports = CustomerService;