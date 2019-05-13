import StoreConstants from '../constants/StoreConstants'
import SakilaDispatcher from '../dispatcher/SakilaDispatcher';

class StoreActions {

    listStores(){
        SakilaDispatcher.handleViewAction({
            actionType : StoreConstants.LIST_STORES,
            payload : null
        });
    }

    listInventory(storeId){
        SakilaDispatcher.handleViewAction({
            actionType : StoreConstants.DETAIL_STORE,
            payload : parseInt(storeId)
        });
    }

    queryEmployees(storeId){
        SakilaDispatcher.handleViewAction({
            actionType : StoreConstants.QUERY_EMPLOYEES,
            payload : parseInt(storeId)
        });
    }
}

export default new StoreActions();