import {combineReducers} from 'redux'; // (*)
import {persistReducer} from 'redux-persist'; // (*)
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import directoryReducer from './directoryReducer';
import shopReducer from './shopReducer';

const persistConfig={
    key: 'root',
    storage, ////metodo storage de persist (tmb puede usarse session)
    whitelist: ['cart'] ////seleccionar el reducer para "persist"
}

const rootReducer= combineReducers({
    user:userReducer,
    cart:cartReducer,
    directory: directoryReducer,
    shop:shopReducer
});

export default persistReducer(persistConfig,rootReducer);