import React from 'react'

import SakilaDispatcher from '../dispatcher/SakilaDispatcher'
import ManagerConstants from "../constants/ManagerConstants";
import ShutterStore from "../store/ShutterStore";
import CustomerConstants from "../constants/CustomerConstants";
import WorkerConstants from "../constants/WorkerConstants";

class ManagerForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listOrders: false,
            jobs: [
                {id: 0, wid: 0, customer: "Bela", address: "Miskolc, Teknős utca 27.", windowHeight: 100, windowWidth: 200, material: "wood", color: "brown", checked: true},
                {id: 1, wid: 1, customer: "Erzsi", address: "Szeged, Kaja tér 14.", windowHeight: 120, windowWidth: 180, material: "plastic", color: "white", checked: false},
                {id: 2, wid: undefined, customer: "Jozsi", address: "Győr, Nyúl utca 6.", windowHeight: 90, windowWidth: 220, material: "metal", color: "gray", checked: false}
            ],
            workers: [],
            orders: [],
            shutters: [],
            customers: []
        }

        this.handleChange = this.handleChange.bind(this);
        ShutterStore.addChangeListener(this.handleChange);
    }

    componentDidMount(){
        SakilaDispatcher.handleViewAction(
            { actionType: WorkerConstants.LIST_ORDERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: CustomerConstants.LIST_SHUTTERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: CustomerConstants.LIST_CUSTOMERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: ManagerConstants.LIST_WORKERS }
        );
    }

    componentWillUnmount(){

    }

    handleChange() {
        this.state.orders = ShutterStore._orders;

        this.state.shutters = ShutterStore._shutters;

        this.state.customers = ShutterStore._customers;

        this.state.workers = ShutterStore._workers;
    }

    saveOrderSettings = (e) => {

        let orderID = Number(e.target.data);
        let workerID = Number(e.target.value);

        SakilaDispatcher.handlePostAction({
                actionType: ManagerConstants.ASSIGN_ORDER,
                payload: {
                    orderID: orderID,
                    workerID: workerID
                }
            }
        );
    }

    setPayed = (e) => {
        let orderID = Number(e.target.name);

        SakilaDispatcher.handlePostAction({
                actionType: ManagerConstants.CREATE_INVOICE,
                payload: {
                    orderID: orderID
                }
            }
        );

        e.target.className = "checked input-checkbox";
    }

    listOrders = () =>  {
        this.setState({listOrders: true});
    }

    showData = (e) =>  {
        let identifier = e.target.name;
        document.getElementById(identifier).classList.toggle("show-more");
    }

    setPayed () {

    }

    render() {
        return (
            <div className="form-content">
                <div className="form-title">
                    <div>
                        Manager
                    </div>
                </div>
                <div>
                    <div>
                        List orders
                    </div>
                    {this.state.listOrders === false
                        ?
                        <div>
                            <button className="btn" onClick={this.listOrders}>
                                List orders
                            </button>
                        </div>
                        :
                        <div>
                            <div>
                                {this.state.orders.map(order => (
                                    <div>
                                        <div>
                                            <div>
                                                <strong>Order ID: </strong> {order.orderID}
                                            </div>
                                        </div>
                                        {this.state.customers.map(customer => (
                                            customer.customerID === order.customerID
                                            ?
                                            <div>
                                                <div className="customer-data" id={order.orderID}>
                                                    <div>
                                                        Customer's ID:
                                                    </div>
                                                    <button name={order.orderID} className="btn" onClick={this.showData}>
                                                        {customer.customerID}
                                                    </button>
                                                </div>
                                                <div className="more-data">
                                                    <div>
                                                        <strong>Name: </strong> {customer.firstName} {customer.lastName}
                                                    </div>
                                                    <div>
                                                        <strong>Address: </strong> {customer.address}
                                                    </div>
                                                    <div>
                                                        <strong>E-mail: </strong> {customer.email}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            ""
                                            ))}
                                        <div>

                                        </div>
                                        <div>
                                            <div>
                                                <strong>Window size: </strong> {order.windowWidth} * {order.windowHeight}
                                            </div>
                                        </div>
                                        {this.state.shutters.map(shutter => (
                                            shutter.shutterID === order.shutter
                                            ?
                                            <div>
                                                <div>
                                                    <strong>Shutter material: </strong> {shutter.material}
                                                </div>
                                                <div>
                                                    <strong>Shutter color: </strong> {shutter.color}
                                                </div>
                                                <div>
                                                    <strong>Shutter price: </strong> {shutter.price}
                                                </div>
                                            </div>
                                            :
                                            <div>

                                            </div>
                                            ))}

                                        {order.state === "finished" || order.state === "payed"
                                        ?
                                        <div className="mt-16">
                                            <label className="checkbox-holder">
                                            <input className="input-checkbox" type="checkbox"
                                                   value={order.orderID} checked={order.state === "payed"}
                                                   onChange={this.setPayed}/>
                                                <span className="checkbox">
                                                    <strong>payed</strong>
                                                </span>
                                            </label>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                        }
                                        <div>
                                            {!order.workerID
                                            ?
                                            <div>
                                                <div>
                                                    Select worker
                                                </div>
                                                {this.state.workers.map(worker => (
                                                    <label className="marginright-10" onClick={this.selectedRadio}>
                                                        <input name="worker" type="radio"/>
                                                        <span>
                                                            {worker.workerID}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                            :
                                            <div>

                                            </div>
                                            }
                                        </div>
                                        <div>
                                            <button className="btn" name={order.orderID} onClick={this.saveOrderSettings}>
                                                Save
                                            </button>
                                        </div>
                                        <hr/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default ManagerForm;