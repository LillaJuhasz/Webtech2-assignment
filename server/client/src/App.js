import React from 'react';
import './App.scss';

import CustomerForm from "./components/CustomerForm";
import WorkerForm from "./components/WorkerForm";
import ManagerForm from "./components/ManagerForm";


function App() {
  return (
    <div className="App container container-main">
        <div className="row form">
            <div className="app-title">
                Shuttershop
            </div>
            <div className="col-md-12">
                <CustomerForm/>
            </div>
            <div className="col-md-12">
                <WorkerForm/>
            </div>
            <div className="col-md-12">
                <ManagerForm/>
            </div>
        </div>
    </div>
  );
}

export default App;
