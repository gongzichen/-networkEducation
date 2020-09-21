import { createStore, applyMiddleware, Store, AnyAction, Dispatch } from "redux";
import reducers, { CombinedState } from './reducers'
import logger from 'redux-logger'
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk'
import promise from 'redux-promise'
import { routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import history from './history'
import { DispatchProp } from "react-redux";

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart']
}


const persistedReducer = persistReducer(persistConfig, reducers)
let store: Store<CombinedState, AnyAction> = createStore<CombinedState, AnyAction, {}, {}>(persistedReducer, applyMiddleware(thunk, routerMiddleware(history), promise, logger))
let persistor = persistStore(store)

export type StoreGetState = () => CombinedState
export type StoreDispatch = DispatchProp & ThunkDispatch<CombinedState, any, AnyAction>

export { store, persistor } 