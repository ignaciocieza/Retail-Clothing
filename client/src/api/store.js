import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from 'redux-persist'; //(*nota en info.txt)
import reducer from "./reducers/indexReducer";
//import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'; //reemplaza a thunk
import {rootSaga} from './actions/indexActions';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
