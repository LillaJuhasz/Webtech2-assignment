import React from 'react';
import ShutterStore from "../store/ShutterStore";
import StoreActions from '../actions/StoreActions';


class WorkerForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            signed: false,
            signWId: undefined,
            shutters: ShutterStore._shutters,
            workers: ShutterStore._workers,
            orders: ShutterStore._orders
        };

        StoreActions.listOrders();
        StoreActions.listShutters();
        StoreActions.listWorkers();
        this._onChange = this._onChange.bind(this);
        this.handleStateSet = this.handleStateSet.bind(this);
    }

    _onChange(){
        this.setState({orders : ShutterStore._orders});
        this.setState({shutters : ShutterStore._shutters});
        this.setState({workers : ShutterStore._workers});
    }

    componentDidMount(){
        ShutterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        ShutterStore.removeChangeListener(this._onChange)
    }


    handleStateSet({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }


    finishOrder = (e) => {
        StoreActions.finishOrder(e);

        this.state.orders.map(order => {
            if(order.orderID === e.target.name) {
                order.state = "finished";
            }
        });
        e.target.checked = true;

        StoreActions.listOrders(e);

        alert("Order marked as finished!");
    };


    signIn = () =>  {
        let validate = false;

        this.state.workers.map(worker => {
            if(Number(this.state.signWId) === Number(worker.workerID)) {
                this.setState({signed: true});
                validate = true;
            }
        });

        if(validate === false) {
            alert(this.state.signWId + " is not a valid worker ID");
        }
    };

    signOut = () =>  {
        this.setState({signed: false});
    };


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
                                Sign in with ID:
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
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="form-subtitle">
                                    List pending jobs:
                                </div>
                                <div className="margintop-10">
                                    {this.state.orders.map(order => (
                                        Number(worker.workerID) === Number(order.workerID) && order.state === 'inprogress'
                                        ?
                                        <div>
                                            <div>
                                                <strong>Order ID: </strong> {order.orderID}
                                            </div>
                                            <div>
                                                <strong>Customer's ID: </strong> {order.customerID}
                                            </div>
                                            <div>
                                                <strong>Window size: </strong> {order.windowWidth} cm * {order.windowHeight} cm
                                            </div>
                                            <div>
                                                <strong>Shutter type: </strong> {order.shutter}
                                            </div>

                                            <div>
                                                <button className="btn" value={worker.workerID} name={order.orderID} onClick={this.finishOrder}>finish job</button>
                                            </div>
                                            <hr/>
                                        </div>
                                        :
                                        <div>

                                        </div>
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

export default WorkerForm;