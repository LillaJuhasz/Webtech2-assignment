import {Dispatcher} from 'flux'
import React from 'react'

import WorkerConstants from '../constants/WorkerConstants'
import ManagerConstants from '../constants/ManagerConstants'
import CustomerConstants from '../constants/CustomerConstants'
import ShutterStore from '../store/ShutterStore'


class ShutterDispatcher extends Dispatcher{

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

    // TODO update
}

const dispatcher = new ShutterDispatcher();



/* ***** GET METHODS ***** */

/* GET ALL WORKERS */

dispatcher.register((data)=>{
    if(data.payload.actionType !== ManagerConstants.GET_WORKERS){
        return;
    }

    fetch('/api/manager/getWorkers',{
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


/* GET ALL CUSTOMERS */

dispatcher.register((data)=>{
    if(data.payload.actionType !== ManagerConstants.GET_CUSTOMERS){
        return;
    }

    fetch('/api/manager/getCustomers',{
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


/* GET ORDERS OF WORKERS WITH STATE 'PENDING' OR 'FINISHED' */

dispatcher.register((data)=>{
    if(data.payload.actionType !== WorkerConstants.GET_ORDERS){
        return;
    }

    fetch('/api/worker/getOrders',{
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


/* GET ALL SHUTTERS */

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.GET_SHUTTERS){
        return;
    }

    fetch('/api/customer/getShutters',{
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



/* **** POST METHODS **** */

/* ASSIGN WORKER TO ORDER AND SET ORDER STATE TO 'PENDING' FROM 'WAITING' */

dispatcher.register((data)=>{
    if(data.payload.actionType !== ManagerConstants.ASSIGN_ORDER){
        return;
    }

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


/* SET ORDER STATE TO 'PAYED' FROM 'FINISHED' */

dispatcher.register((data)=>{
    if(data.payload.actionType !== ManagerConstants.POST_INVOICE) {
        return;
    }

    fetch('/api/manager/postInvoice',{
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


/* SET ORDER STATE TO 'FINISHED' FROM 'PENDING' */

dispatcher.register((data)=>{
    if(data.payload.actionType !== WorkerConstants.FINISH_ORDER){
        return;
    }

    fetch('/api/worker/finishOrder',{
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


/* REGISTER NEW CUSTOMER */

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.POST_CUSTOMER) {
        return;
    }

    fetch('/api/customer/postCustomer',{
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


/* CREATE NEW ORDER */

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.POST_ORDER) {
        return;
    }

    fetch('/api/customer/postOrder',{
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



export default dispatcher;