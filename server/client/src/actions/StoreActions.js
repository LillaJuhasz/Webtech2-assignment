import ManagerConstants from "../constants/ManagerConstants";
import WorkerConstants from '../constants/WorkerConstants';
import CustomerConstants from "../constants/CustomerConstants";
import Dispatcher from '../dispatcher/Dispatcher';


class StoreActions {


    getWorkers(workerID){
        Dispatcher.handleViewAction({
            actionType : ManagerConstants.GET_WORKERS,
            payload : workerID
        });
    }

    getShutters(shutterID){
        Dispatcher.handleViewAction({
            actionType : CustomerConstants.GET_SHUTTERS,
            payload : shutterID
        });
    }

    getCustomers(customerID){
        Dispatcher.handleViewAction({
            actionType : ManagerConstants.GET_CUSTOMERS,
            payload : customerID
        });
    }

    assignOrder = (orderID, workerID) => {
        Dispatcher.handlePostAction({
                actionType: ManagerConstants.ASSIGN_ORDER,
                payload: {
                    orderID: orderID,
                    workerID: workerID
                }
            }
        );
    };

    postInvoice = (e) => {
        let orderID = Number(e.target.value);

        Dispatcher.handlePostAction({
                actionType: ManagerConstants.POST_INVOICE,
                payload: {
                    orderID: orderID
                }
            }
        );
    };

    getOrders(orderID){
        setTimeout(
            function() {
                Dispatcher.handleViewAction({
                    actionType : WorkerConstants.GET_ORDERS,
                    payload : orderID
                });
            }
            ,100
        );

    }

    finishOrder = (e) => {
        let orderID = Number(e.target.name);
        let workerID = Number(e.target.value);

        Dispatcher.handlePostAction({
                actionType: WorkerConstants.FINISH_ORDER,
                payload: {
                    orderID: orderID,
                    workerID: workerID
                }
            }
        );
    };

    postCustomer = (id) => {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;

        Dispatcher.handlePostAction({
                actionType: CustomerConstants.POST_CUSTOMER,
                payload: {
                    customerID: id,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    email: email
                }
            }
        );
    };

    postOrder = (shutter, orderID, customerID) => {
        let windowWidth = document.getElementById("windowWidth").value;
        let windowHeight = document.getElementById("windowHeight").value;


        Dispatcher.handlePostAction({
                actionType: CustomerConstants.POST_ORDER,
                payload: {
                    orderID: orderID,
                    customerID: customerID,
                    windowWidth: windowWidth,
                    windowHeight: windowHeight,
                    shutter: shutter
                }
            }
        );
    };
}

export default new StoreActions();