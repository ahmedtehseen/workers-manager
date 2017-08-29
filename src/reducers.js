import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux'
import { firebaseStateReducer } from 'react-redux-firebase'

import {
	AppReducer,
	LoginReducer,
	DashboardReducer
} from './modules';

export const rootInitialState = {
}

export let rootReducer = combineReducers({
	auth: LoginReducer,
	app: AppReducer,
	dashboard: DashboardReducer,
	routing: routerReducer,
	form: formReducer,
	firebase: firebaseStateReducer
});
