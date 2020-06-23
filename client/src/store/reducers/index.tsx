import { combineReducers, ReducersMapObject, Reducer } from "redux";
import { connectRouter } from 'connected-react-router' // 路由+redux
import history from '../history'
import home from './home'
import mime from './mime'
import profile from './profile'

let reducers: ReducersMapObject = {
	router: connectRouter(history),
	home,
	mime,
	profile
}

