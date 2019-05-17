const assert = require('assert');
const sinon = require('sinon');

const service = require('../services/WorkerService');

describe('Worker Service Test',function(){
    

    it('list order from DB',function(){
        var s = new service();
        s.getOrders((requests) => console.log(requests))
    });

    it('list orders',function(){
        var dao = {
            getOrders : function(callback){
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
        s.getOrders((requests) => {
            console.log('requests');
            console.log(requests)})
    });

    it('list orders test Mocked API called once', function(){
        var dao  = { getOrders : function(callback){}};
        var spy = sinon.spy();
        var daoMock = sinon.mock(dao);
        daoMock.expects('getOrders').once();
        var s = new service(dao);
        s.getOrders((requests) =>{});

        assert(daoMock.verify())

    })
});