import React from 'react'
import ShutterStore from "../store/ShutterStore";
import StoreActions from "../actions/StoreActions";


class CustomerForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            signed: false,
            orders: ShutterStore._orders,
            customers: ShutterStore._customers,
            shutters: ShutterStore._shutters,
            signedCustomer: undefined,
            selectedShutter: undefined,
            number: 0
        };

        StoreActions.listShutters();
        StoreActions.listOrders();
        StoreActions.listCustomers();
        this._onChange = this._onChange.bind(this);
    }

    _onChange(){
        this.setState({orders : ShutterStore._orders});
        this.setState({shutters : ShutterStore._shutters});
        this.setState({customers : ShutterStore._customers});
    }

    componentDidMount(){
        ShutterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        ShutterStore.removeChangeListener(this._onChange)
    }


    signIn = () =>  {
        this.state.customers.map(customer => {
            if(document.getElementById("signInEmail").value === customer.email) {
                this.setState({signed: true});
                this.state.signedCustomer = customer.customerID;
            }
        });
        if(this.state.signedCustomer === undefined) {
            alert("Please register before sign in!");
        }
    };

    registration = (id) => {
        id = this.state.customers.length+1;
        StoreActions.registration(id);

        this.state.signedCustomer = id;
        this.setState({signed: true});

        alert("Registration succeed!");
    };

    signOut = () =>  {
        this.setState({signed: false});
        this.state.signedCustomer = undefined;
    };

    createOrder = (shutter, orderID, customerID) => {
        shutter = this.state.selectedShutter;
        orderID = this.state.orders.length + 1;
        customerID =  this.state.signedCustomer;

        StoreActions.createOrder(shutter, orderID, customerID);
        StoreActions.listOrders(orderID);

        alert("Creating order succeed!");
    };

    selectShutter = (e) => {
        this.state.selectedShutter = Number(e.target.value);
    };

    render() {
        return (
            <div className="form-content">
                <div className="form-title">
                    {this.state.signed === false
                        ?
                        <span>Customer</span>
                        :
                        <div>
                            <div className="form-title">
                                Welcome {this.state.customers.firstName}
                            </div>
                            <div>
                            <button className="btn" onClick={this.signOut}>log out</button>
                                <hr/>
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
                                    <div>Sign in with e-mail:</div>
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
                            <div className="form-subtitle">
                                Ordering
                            </div>
                            <div>
                                <div>
                                    <div>Window width (cm)</div>
                                    <input id="windowWidth" type="text"/>
                                </div>
                                <div>
                                    <div>Window height (cm)</div>
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
                                                {shutter.material}, {shutter.color}, {shutter.price} $
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
                            <div className="form-subtitle">
                                My orders
                            </div>
                            <div>
                                {this.state.orders.map(order => (
                                    order.customerID === this.state.signedCustomer
                                        ?
                                        <div>
                                            <div>
                                                <strong>Window: </strong> {order.windowWidth} cm * {order.windowHeight} cm
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
                                                            <strong>Shutter's price: </strong> {shutter.price} $
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>

                                                    </div>
                                            ))}
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