import { USER_LOGIN_SUCCESS } from './Login.actions';
import { USER_LOGOUT } from '../Dashboard';

const INITIAL_STATE = {
	isLoggedIn: false,
	user: null
}

export const LoginReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case USER_LOGIN_SUCCESS:
			return {...state, isLoggedIn: true, user: action.payload}
		case USER_LOGOUT:
			return INITIAL_STATE;
		default:
			return state
	}
}