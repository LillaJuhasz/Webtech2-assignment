import WorkerConstants from '../constants/WorkerConstants'
import ManagerConstants from "../constants/ManagerConstants";
import CustomerConstants from "../constants/CustomerConstants";
import SakilaDispatcher from '../dispatcher/SakilaDispatcher';


class StoreActions {

    finishOrder = (e) => {
        let orderID = Number(e.target.name);
        let workerID = Number(e.target.value);

        SakilaDispatcher.handlePostAction({
                actionType: WorkerConstants.FINISH_ORDER,
                payload: {
                    orderID: orderID,
                    workerID: workerID
                }
            }
        );
    };

    saveOrderSettings = (orderID, workerID) => {
        SakilaDispatcher.handlePostAction({
                actionType: ManagerConstants.ASSIGN_ORDER,
                payload: {
                    orderID: orderID,
                    workerID: workerID
                }
            }
        );
    };

    setPayed = (e) => {
        let orderID = Number(e.target.value);

        SakilaDispatcher.handlePostAction({
                actionType: ManagerConstants.CREATE_INVOICE,
                payload: {
                    orderID: orderID
                }
            }
        );
    };

    registration = (id) => {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;

        SakilaDispatcher.handlePostAction({
                actionType: CustomerConstants.CREATE_CUSTOMER,
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

    createOrder = (shutter, orderID, customerID) => {
        let windowWidth = document.getElementById("windowWidth").value;
        let windowHeight = document.getElementById("windowHeight").value;


        SakilaDispatcher.handlePostAction({
                actionType: CustomerConstants.NEW_ORDER,
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

    listWorkers(workerID){
        SakilaDispatcher.handleViewAction({
            actionType : ManagerConstants.LIST_WORKERS,
            payload : workerID
        });
    }

    listShutters(shutterID){
        SakilaDispatcher.handleViewAction({
            actionType : CustomerConstants.LIST_SHUTTERS,
            payload : shutterID
        });
    }

    listCustomers(customerID){
        SakilaDispatcher.handleViewAction({
            actionType : ManagerConstants.LIST_CUSTOMERS,
            payload : customerID
        });
    }

    listOrders(orderID){
        SakilaDispatcher.handleViewAction({
            actionType : WorkerConstants.LIST_ORDERS,
            payload : orderID
        });
    }
}

export default new StoreActions();