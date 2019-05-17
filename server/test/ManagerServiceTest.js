const assert = require('assert');
const sinon = require('sinon');

const service = require('../services/ManagerService');

describe('Customer Service Test',function(){


    it('list customer from DB',function(){
        var s = new service();
        s.getCustomers((requests) => console.log(requests))
    });

    it('list customers',function(){
        var dao = {
            getCustomers : function(callback){
                callback({
                    customerID:1,
                    firstName:"first",
                    lastName:"last",
                    address:"address",
                    email:"email"
                })
            }
        };
        var s = new service(dao);
        s.getCustomers((requests) => {
            console.log('requests');
            console.log(requests)})
    });

    it('list customers test Mocked API called once', function(){
        var dao  = { getCustomers : function(callback){}};
        var spy = sinon.spy();
        var daoMock = sinon.mock(dao);
        daoMock.expects('getCustomers').once();
        var s = new service(dao);
        s.getCustomers((requests) =>{});

        assert(daoMock.verify())

    });

    it('list worker from DB',function(){
        var s = new service();
        s.getWorkers((requests) => console.log(requests))
    });

    it('list workers',function(){
        var dao = {
            getAllWorkers : function(callback){
                callback({
                    workerID:1,
                    firstName:"first",
                    lastName:"last"
                })
            }
        };
        var s = new service(dao);
        s.getWorkers((requests) => {
            console.log('requests');
            console.log(requests)})
    });

    it('list worker test Mocked API called once', function(){
        var dao  = { getAllWorkers : function(callback){}};
        var spy = sinon.spy();
        var daoMock = sinon.mock(dao);
        daoMock.expects('getAllWorkers').once();
        var s = new service(dao);
        s.getWorkers((requests) =>{});

        assert(daoMock.verify())

    })
});