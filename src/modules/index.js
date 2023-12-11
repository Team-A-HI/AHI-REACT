import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({

    
})

const persistConfig = {
    key: "root",
    storage: storage
};

export default persistReducer(persistConfig, rootReducer)

