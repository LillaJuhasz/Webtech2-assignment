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

    // TODO update
}

const dispatcher = new SakilaDispatcher();



/* **** POST METHODS **** */

/* ASSIGN WORKER TO ORDER AND SET ORDER STATE TO 'INPROGRESS' FROM 'WAITING' */

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
    if(data.payload.actionType !== ManagerConstants.CREATE_INVOICE) {
        return;
    }

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


/* REGISTER NEW CUSTOMER */

dispatcher.register((data)=>{
    if(data.payload.actionType !== CustomerConstants.CREATE_CUSTOMER) {
        return;
    }

    fetch('/api/customer/newCustomer',{
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
    if(data.payload.actionType !== CustomerConstants.NEW_ORDER) {
        return;
    }

    fetch('/api/customer/newOrder',{
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


/* SET ORDER STATE TO 'FINISHED' FROM 'INPROGRESS' */

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



/* ***** GET METHODS ***** */


/* GET ORDERS OF WORKERS WITH STATE 'INPROGRESS' OR 'FINISHED' */

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


/* GET ALL WORKERS */

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


/* GET ALL SHUTTERS */

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


/* GET ALL CUSTOMERS */

dispatcher.register((data)=>{
    if(data.payload.actionType !== ManagerConstants.LIST_CUSTOMERS){
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