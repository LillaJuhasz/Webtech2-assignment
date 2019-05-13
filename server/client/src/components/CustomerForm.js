import React from 'react'
import ShutterStore from "../store/ShutterStore";
import SakilaDispatcher from "../dispatcher/SakilaDispatcher";
import WorkerConstants from "../constants/WorkerConstants";
import CustomerConstants from "../constants/CustomerConstants";
import ManagerConstants from "../constants/ManagerConstants";
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";

class CustomerForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            signed: false,
            colors: [
                "brown",
                "gray",
                "white"
            ],
            materials: [
                "plastic",
                "metal",
                "wood"
            ],
            orders: [],
            customers: [],
            shutters: [],
            signedCustomer: undefined,
            selectedShutter: undefined
        }

        this.handleChange = this.handleChange.bind(this);
        ShutterStore.addChangeListener(this.handleChange);
    }

    componentDidMount(){
        SakilaDispatcher.handleViewAction(
            { actionType: WorkerConstants.LIST_ORDERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: CustomerConstants.LIST_CUSTOMERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: CustomerConstants.LIST_SHUTTERS }
        );

    }

    componentWillUnmount(){

    }

    handleChange() {
        this.state.orders = ShutterStore._orders;

        this.state.customers = ShutterStore._customers;

        this.state.shutters = ShutterStore._shutters;
    }

    signIn = () =>  {
        this.state.customers.map(customer => {
            if(document.getElementById("signInEmail").value === customer.email) {
                this.setState({signed: true});
                this.state.signedCustomer = customer.customerID;
            }
        });
        if(this.state.signedCustomer === undefined) {
            alert("Please registrate before sign in");
        }
    }

    registration = () => {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;

        let id = this.state.customers.length+1;

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
        this.state.signedCustomer = id;
        console.log(this.state.signedCustomer);
        this.setState({signed: true});
    }

    signOut = () =>  {
        this.setState({signed: false});
        this.state.signedCustomer = undefined;
    }

    createOrder = () => {
        let windowWidth = document.getElementById("windowWidth").value;
        let windowHeight = document.getElementById("windowHeight").value;
        let shutter = this.state.selectedShutter;
        let orderID = this.state.orders.length + 1;
        let customerID =  this.state.signedCustomer;

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

    }

    selectShutter = (e) => {
        this.state.selectedShutter = Number(e.target.value);
    }

    render() {
        return (
            <div className="form-content">
                <div className="form-title">
                    {this.state.signed === false
                        ?
                        <span>Customer</span>
                        :
                        <div>
                            <span>Customer</span>
                            <div>
                                <button className="btn" onClick={this.signOut}>log out</button>
                            </div>
                        </div>
                    }
                </div>
                {this.state.signed === false
                    ?
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>Sign in with your E-mail</div>
                                    <input id="signInEmail" className="input-field" type="email"/>
                                </div>
                                <button className="btn" onClick={this.signIn}>
                                    Sign in
                                </button>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <div className="form-subtitle">
                                Registration
                            </div>
                            <div>
                                <div>
                                    <div>First name</div>
                                    <input id="firstName" className="input-field" type="text"/>
                                </div>
                                <div>
                                    <div>Last name</div>
                                    <input id="lastName" className="input-field" type="text"/>
                                </div>
                                <div>
                                    <div>E-mail</div>
                                    <input id="email" type="text"/>
                                </div>
                                <div>
                                    <div>Address</div>
                                    <input id="address" className="input-field" type="text"/>
                                </div>
                                <button className="btn" onClick={this.registration}>
                                    Registration
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <div>
                                <strong>Ordering</strong>
                            </div>
                            <div>
                                <div>
                                    <div>Window width</div>
                                    <input id="windowWidth" type="text"/>
                                </div>
                                <div>
                                    <div>Window height</div>
                                    <input id="windowHeight" type="text"/>
                                </div>
                                <div>
                                    <div className="margintop-10">
                                        Shutter
                                    </div>
                                    {this.state.shutters.map(shutter => (
                                        <label className="block">
                                            <input name="shutter" value={shutter.shutterID} type="radio" onClick={this.selectShutter}/>
                                            <span>
                                                {shutter.material}, {shutter.color}, {shutter.price}
                                            </span>
                                        </label>
                                        ))}
                                </div>
                                <button className="btn" onClick={this.createOrder}>
                                    Send order
                                </button>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <div>
                                My orders
                            </div>
                            <div>
                                {this.state.orders.map(order => (
                                    order.customerID === this.state.signedCustomer
                                        ?
                                        <div>
                                            <div>
                                                <strong>Customer ID: </strong> {order.customerID}
                                            </div>
                                            <div>
                                                <strong>Window: </strong> {order.windowWidth} * {order.windowHeight}
                                            </div>
                                            <div>
                                                <strong>Shutter type: </strong> {order.shutter}
                                            </div>
                                            <hr/>
                                        </div>
                                        :
                                        ""
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default CustomerForm;