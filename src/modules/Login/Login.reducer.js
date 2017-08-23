import { USER_LOGIN_SUCCESS } from './Login.actions';
import { USER_LOGOUT } from '../Dashboard';

const INITIAL_STATE = {
	isLoggedIn: false
}

export const LoginReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case USER_LOGIN_SUCCESS:
			return {...state, isLoggedIn: true}
		case USER_LOGOUT:
			return {...state, isLoggedIn: false}
		default:
			return state
	}
}