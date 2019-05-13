const assert = require('assert');
const sinon = require('sinon');

const service = require('../services/CustomerService');

describe('Customer Service Test',function(){


    it('list shutter from DB',function(){
        var s = new service();
        s.getShutters((requests) => console.log(requests))
    });

    it('list shutters',function(){
        var dao = {
            readShutters : function(callback){
                callback({
                    shutterID:1,
                    material:"wood",
                    color:"black",
                    price:100
                })
            }
        };
        var s = new service(dao);
        s.getShutters((requests) => {
            console.log('requests');
            console.log(requests)})
    });

    it('list shutters test Mocked API called once', function(){
        var dao  = { readShutters : function(callback){}};
        var spy = sinon.spy();
        var daoMock = sinon.mock(dao);
        daoMock.expects('readShutters').once();
        var s = new service(dao);
        s.getShutters((requests) =>{});

        assert(daoMock.verify())

    });

    it('list order from DB',function(){
        var s = new service();
        s.listOrders((requests) => console.log(requests))
    });

    it('list orders',function(){
        var dao = {
            readOrders : function(callback){
                callback({
                    orderID:1,
                    customerID:1,
                    windowWidth:100,
                    windowHeight:140,
                    shutter:2,
                    state:"waiting"
                })
            }
        };
        var s = new service(dao);
        s.listOrders((requests) => {
            console.log('requests');
            console.log(requests)})
    });

    it('list orders test Mocked API called once', function(){
        var dao  = { readOrders : function(callback){}};
        var spy = sinon.spy();
        var daoMock = sinon.mock(dao);
        daoMock.expects('readOrders').once();
        var s = new service(dao);
        s.listOrders((requests) =>{});

        assert(daoMock.verify())

    })
});