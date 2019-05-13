import React from 'react';
import StoreActions from "../actions/StoreActions";
import ShutterStore from "../store/ShutterStore";

class StoreList extends React.Component{

    constructor(props) {
        super(props);
        StoreActions.listStores();
        this._onChange = this._onChange.bind(this);
        this.state = { stores : []};
    }

    _onChange(){
        this.setState({stores: ShutterStore._stores});
    }

    componentDidMount(){
        ShutterStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        ShutterStore.removeChangeListener(this._onChange)
    }





    render(){
        return(
            
        <div className="card">
            <div className="card-header">Stores</div>
            <div className="card-body">
                <ul className="list-group">
                    {
                        this.state.stores.map((store)=>{
                            return (
                                <li key={store._id}
                                    className="list-group-item"
                                    onClick={() => StoreActions.listInventory(store._id)}>
                                    {store.Address},<br/>
                                    {store.City}, {store.Country}
                                </li>)
                        })
                    }
                </ul>
            </div>
            <div className="card-footer"></div>
        </div>
        )
    }
}

export default StoreList