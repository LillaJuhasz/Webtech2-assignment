import React from 'react';

import SakilaDispatcher from '../dispatcher/SakilaDispatcher'
import WorkerConstants from "../constants/WorkerConstants";
import ManagerConstants from "../constants/ManagerConstants";
import CustomerConstants from "../constants/CustomerConstants";
import ShutterStore from "../store/ShutterStore";

class CustomerForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            signed: false,
            signWId: undefined,
            shutters: [],
            workers: [],
            orders: []
        }


        this.handleStateSet = this.handleStateSet.bind(this);
        this.handleChange = this.handleChange.bind(this);
        ShutterStore.addChangeListener(this.handleChange);
    }

    handleStateSet({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    finishOrder = (e) => {
        let orderID = Number(e.target.name);
        let workerID = Number(e.target.value);
        console.log(workerID + ", " + orderID);

        SakilaDispatcher.handlePostAction({
                actionType: WorkerConstants.FINISH_ORDER,
                payload: {
                    orderID: orderID,
                    workerID: workerID
                }
            }
        );

        this.state.orders.map(order => {
            if(order.orderID === e.target.name) {
                order.state = "finished";
            }
        })
        e.target.checked = true;
    }

    componentDidMount(){
        SakilaDispatcher.handleViewAction(
            { actionType: WorkerConstants.LIST_PENDING_ORDERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: ManagerConstants.LIST_WORKERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: CustomerConstants.LIST_SHUTTERS }
        );
    }

    componentWillUnmount(){

    }

    signIn = () =>  {
        let validate = false;

        this.state.workers.map(worker => {
            console.log(this.state.signWId + ", " + worker.workerID);
            if(Number(this.state.signWId) === Number(worker.workerID)) {
                this.setState({signed: true});
                validate = true;
            }
        });

        if(validate === false) {
            alert(this.state.signWId + " is not empty");
        }
    }

    signOut = () =>  {
        this.setState({signed: false});
    }

    handleChange() {
        this.state.orders = ShutterStore._orders;

        this.state.workers = ShutterStore._workers;

        this.state.shutters = ShutterStore._shutters;
    }

    sendData () {

    }

    render() {
        return (
            <div className="form-content">
                {this.state.signed === false
                    ?
                    <div>
                        <div>
                            <div className="form-title">
                                Worker
                            </div>
                        </div>
                        <div>
                            <div>
                                Sign in with your ID
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <input type="number" name="signWId" onChange={this.handleStateSet}/>
                                    </div>
                                    <button className="btn" onClick={this.signIn}>
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                    {this.state.workers.map(worker => (
                        Number(worker.workerID) === Number(this.state.signWId)
                        ?
                        <div>
                            <div className="">
                                <div>
                                    <div className="form-title">
                                        Welcome {worker.firstName}
                                    </div>
                                    <div>
                                        <button className="btn" onClick={this.signOut}>log out</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    List of your jobs:
                                </div>
                                <div className="margintop-10">
                                    {this.state.orders.map(order => (
                                        Number(worker.workerID) === Number(order.workerID)
                                        ?
                                        <div>
                                            <div>
                                                <strong>Order ID: </strong> {order.orderID}
                                            </div>
                                            <div>
                                                <strong>Customer's ID: </strong> {order.customerID}
                                            </div>
                                            <div>
                                                <strong>Window size: </strong> {order.windowWidth} * {order.windowHeight}
                                            </div>
                                            {this.state.shutters.map(shutter => (
                                                shutter.shutterID === order.shutter
                                                ?
                                                <div>
                                                    <div>
                                                        <strong>Shutter's material: </strong> {shutter.material}
                                                    </div>
                                                    <div>
                                                        <strong>Shutter's color: </strong> {shutter.color}
                                                    </div>
                                                    <div>
                                                        <strong>Shutter's price: </strong> {shutter.price}
                                                    </div>
                                                </div>
                                                :
                                                <div>

                                                </div>
                                            ))}

                                            <div>
                                                <label>
                                                    <input type="checkbox"
                                                           value={worker.workerID} name={order.orderID} checked={order.state === "finished" || order.state === "payed"}
                                                           onChange={this.finishOrder}/>
                                                    <span className="checkbox">
                                                    <strong>finished</strong>
                                                </span>
                                                </label>
                                            </div>
                                            <hr/>
                                        </div>
                                        :
                                        <div></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        :
                        <div>

                        </div>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default CustomerForm;