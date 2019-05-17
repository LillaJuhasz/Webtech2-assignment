import React from 'react'
import ShutterStore from "../store/ShutterStore";
import StoreActions from "../actions/StoreActions";


class ManagerForm extends React.Component {

    constructor(props) {
        super(props);

        StoreActions.getOrders();
        StoreActions.getWorkers();
        StoreActions.getShutters();
        StoreActions.getCustomers();

        this._onChange = this._onChange.bind(this);

        this.state = {
            shutters: ShutterStore._shutters,
            workers: ShutterStore._workers,
            orders: ShutterStore._orders,
            customers: ShutterStore._customers,
            getOrders: false,
            selectedWorker: [],
            selectedShutter: []
        };
    }


    componentDidMount(){
        ShutterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        ShutterStore.removeChangeListener(this._onChange)
    }

    _onChange(){
        this.setState({orders : ShutterStore._orders});
        this.setState({shutters : ShutterStore._shutters});
        this.setState({workers : ShutterStore._workers});
        this.setState({customers : ShutterStore._customers});
    }


    assignOrder = (orderID, workerID) => {
        workerID = this.state.selectedWorker;
        StoreActions.assignOrder(orderID, workerID);
        StoreActions.getOrders(orderID);
    };

    handleInputChange = (e) => {
        this.setState({selectedWorker: Number(e.target.value)});
    };

    postInvoice = (e) => {
        StoreActions.postInvoice(e);
        StoreActions.getOrders(e);

        alert("Order mark as payed!");
    };

    getOrders = () =>  {
        this.setState({getOrders: true});
    };

    showData = (e) =>  {
        let identifier = e.target.name;
        document.getElementById(identifier).classList.toggle("show-more");
    };

    selectedRadio = () => {
    };


    render() {
        return (
            <div className="form-content">
                <div className="form-title">
                    <div>
                        Manager
                    </div>
                </div>
                <div>
                    {this.state.getOrders === false
                        ?
                        <div>
                            <button className="btn" onClick={this.getOrders}>
                                List orders
                            </button>
                        </div>
                        :
                        <div>
                            <hr/>
                            <div>
                                {ShutterStore._orders.map(order => (
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
                                                        Customer's ID: {customer.customerID}
                                                    </div>
                                                    <button name={order.orderID} className="btn" onClick={this.showData}>
                                                        Show info
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
                                                <strong>Window size: </strong> {order.windowWidth} cm * {order.windowHeight} cm
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
                                                    <strong>Shutter price: </strong> {shutter.price}$
                                                </div>
                                            </div>
                                            :
                                            <div>

                                            </div>
                                            ))}

                                        {order.state === "finished" || order.state === "payed"
                                            ?
                                            <div>
                                                {order.state === "finished"
                                                    ?
                                                    <div className="mt-16">
                                                        <label className="checkbox-holder">
                                                            <input className="input-checkbox" type="checkbox"
                                                                   name={order.shutter}
                                                                   value={order.orderID}
                                                            />
                                                            <span className="checkbox">
                                                                <strong>payed</strong>
                                                            </span>
                                                        </label>
                                                        <div>
                                                            <button className="btn" value={order.orderID}
                                                                    onClick={this.postInvoice}>
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>

                                                    </div>
                                                }
                                                {order.state === "payed"
                                                    ?
                                                    <div className="mt-16">
                                                        <label className="checkbox-holder">
                                                            <input className="input-checkbox" type="checkbox"
                                                                   name={order.shutter}
                                                                   value={order.orderID}
                                                                   checked
                                                            />
                                                            <span className="checkbox">
                                                                <strong>payed</strong>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    :
                                                    ""
                                                }

                                            </div>
                                            :
                                            ""
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
                                                        <input value={worker.workerID} name="worker" type="radio" onChange={this.handleInputChange}/>
                                                        <span>
                                                            {worker.workerID}
                                                        </span>
                                                    </label>
                                                ))}
                                                <div>
                                                    <button className="btn" name={order.orderID} onClick={()=>this.assignOrder(order.orderID)}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            <div>

                                            </div>
                                            }
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