import React from 'react'
import ShutterStore from "../store/ShutterStore";
import StoreActions from "../actions/StoreActions";
const emailRegexp = new RegExp('\\S+@\\S+\\.\\S+','i');

class CustomerForm extends React.Component{

    constructor(props) {
        super(props);

        StoreActions.getShutters();
        StoreActions.getOrders();
        StoreActions.getCustomers();

        this._onChange = this._onChange.bind(this);

        this.state = {
            orders: ShutterStore._orders,
            customers: ShutterStore._customers,
            shutters: ShutterStore._shutters,
            signed: false,
            signedCustomer: [undefined, undefined],
            selectedShutter: undefined
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
        this.setState({customers : ShutterStore._customers});
    }


    signIn = () =>  {
        this.state.customers.map(customer => {
            if(document.getElementById("signInEmail").value === customer.email) {
                this.setState({signed: true});
                this.state.signedCustomer[0] = customer.customerID;
                this.state.signedCustomer[1] = customer.firstName;
            }
        });
        if(this.state.signedCustomer[0] === undefined) {
            alert("Please register before sign in!");
        }
    };

    signOut = () =>  {
        this.setState({signed: false});
        this.state.signedCustomer[0] = undefined;
        this.state.signedCustomer[1] = undefined;
    };

    postCustomer = (id) => {
        id = this.state.customers.length + 1;

        if(emailRegexp.test(document.getElementById("email").value)) {
            this.state.signedCustomer[0] = id;
            this.state.signedCustomer[1] = document.getElementById("firstName").value;

            StoreActions.postCustomer(id);

            this.setState({signed: true});
            this.state.signed = true;

            alert("Registration succeed!");
        }
        else {
            alert("E-mail must be a valid e-mail!");
        }
    };

    postOrder = (shutter, orderID, customerID) => {
        shutter = this.state.selectedShutter;
        orderID = this.state.orders.length + 1;
        customerID =  this.state.signedCustomer[0];

        StoreActions.postOrder(shutter, orderID, customerID);
        StoreActions.getOrders(orderID);

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
                            <div>
                                <div className="form-title">
                                    Welcome {this.state.signedCustomer[1]}
                                </div>
                                <div>
                                    <button className="btn" onClick={this.signOut}>log out</button>
                                    <hr/>
                                </div>
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
                                <button className="btn" onClick={this.postCustomer}>
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
                                                {shutter.material}, {shutter.color}, {shutter.price}$
                                            </span>
                                        </label>
                                        ))}
                                </div>
                                <button className="btn" onClick={this.postOrder}>
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
                                    order.customerID === this.state.signedCustomer[0]
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
                                                            <strong>Shutter's price: </strong> {shutter.price}$
                                                        </div>
                                                    </div>
                                                    :
                                                    ""
                                            ))}
                                            <hr/>
                                        </div>
                                        :
                                        ""
                                ))}
                            </div>
                            <div className="form-subtitle">
                                My invoices
                            </div>
                            <div>
                                {this.state.orders.map(order => (
                                    (order.customerID === this.state.signedCustomer[0]) && (order.invoice)
                                    ?
                                    <div>
                                        <div>
                                            Order ID: {order.orderID}
                                        </div>
                                        <div>
                                            Date: {order.invoice}
                                        </div>
                                        <div>
                                            Shutter type: {order.shutter}
                                        </div>
                                        {this.state.shutters.map(shutter => (
                                            shutter.shutterID === order.shutter
                                            ?
                                                <div>
                                                    <strong>Price</strong>
                                                    <div>
                                                        Netto Price: {shutter.price}$
                                                    </div>
                                                    <div>
                                                        Brutto Price: {shutter.price * 1.2}$
                                                    </div>
                                                    <div>
                                                        Installation cost: 50$
                                                    </div>
                                                    <div>
                                                        <strong>Invoice: {shutter.price * 1.2 + 50}$</strong>
                                                    </div>
                                                </div>
                                                :
                                                ""
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