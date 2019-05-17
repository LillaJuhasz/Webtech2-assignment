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
            getShutters : function(callback){
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
        var dao  = { getShutters : function(callback){}};
        var spy = sinon.spy();
        var daoMock = sinon.mock(dao);
        daoMock.expects('getShutters').once();
        var s = new service(dao);
        s.getShutters((requests) =>{});

        assert(daoMock.verify())

    });

});