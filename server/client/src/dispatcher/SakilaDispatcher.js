import {Dispatcher} from 'flux'
import React from 'react'

import WorkerConstants from '../constants/WorkerConstants'
import ManagerConstants from '../constants/ManagerConstants'
import CustomerConstants from '../constants/CustomerConstants'
import ShutterStore from '../store/ShutterStore'

class SakilaDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        });
    }

    handlePostAction(action){
        this.dispatch({
            source : 'POST_ACTION',
            payload : action
        });
    }
}

const dispatcher = new SakilaDispatcher();


dispatcher.register((data)=>{
    if(data.payload.actionType !== ManagerConstants.ASSIGN_ORDER){
        return;
    }
    console.log(data.payload.payload);
    fetch('/api/manager/assignOrder',{
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(data.payload.payload)

    }).then((response) => { return response; })
        .then((res) =>{
            console.log(res);
        });
});

/* PAYED ORDER */

dispatcher.register((data)=>{
    if(data.payload.actionType !== ManagerConstants.CREATE_INVOICE) {
        return;
    }
    console.log(data.payload.payload);
    fetch('/api/manager/createInvoice',{
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(data.payload.payload)

    }).then((response) => { return response; })
        .then((res) =>{
            console.log(res);
        });
});

/* CREATE CUSTOMER */

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.CREATE_CUSTOMER) {
        return;
    }
    console.log(data.payload.payload);
    fetch('/api/customer/newCustomer',{
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(data.payload.payload)

    }).then((response) => { return response; })
        .then((res) =>{
            console.log("");
        });
});

/* NEW ORDER */

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.NEW_ORDER) {
        return;
    }
    console.log(data.payload.payload);
    fetch('/api/customer/newOrder',{
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(data.payload.payload)

    }).then((response) => { return response; })
        .then((res) =>{
            console.log("");
        });
});


/*FINISH ORDER*/

dispatcher.register((data)=>{
    if(data.payload.actionType !== WorkerConstants.FINISH_ORDER){
        return;
    }
    console.log(data.payload.payload);
    fetch('/api/worker/finishOrder',{
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(data.payload.payload)

    }).then((response) => { return response; })
        .then((res) =>{
            console.log("");
        });
});






dispatcher.register((data)=>{
    if(data.payload.actionType !== WorkerConstants.LIST_PENDING_ORDERS){
        return;
    }

    fetch('/api/worker/listPendingOrders?workerID=2',{
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }).then(response =>{ return response.json()})
        .then(result =>{
            ShutterStore._orders = result;
            ShutterStore.emitChange();
        });
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== WorkerConstants.LIST_ORDERS){
        return;
    }

    fetch('/api/worker/listOrderByID',{
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }).then(response =>{ return response.json()})
        .then(result =>{
            ShutterStore._orders = result;
            ShutterStore.emitChange();
        });
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== ManagerConstants.LIST_WORKERS){
        return;
    }

    fetch('/api/manager/listWorkers',{
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }).then(response =>{ return response.json()})
        .then(result =>{
            ShutterStore._workers = result;
            ShutterStore.emitChange();
        });
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.LIST_SHUTTERS){
        return;
    }

    fetch('/api/customer/listShutters',{
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }).then(response =>{ return response.json()})
        .then(result =>{
            ShutterStore._shutters = result;
            ShutterStore.emitChange();
        });
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.LIST_CUSTOMERS){
        return;
    }

    fetch('/api/manager/listCustomers',{
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }).then(response =>{ return response.json()})
        .then(result =>{
            ShutterStore._customers = result;
            ShutterStore.emitChange();
        });
});



export default dispatcher;