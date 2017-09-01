import {
	GET_WORKERS_SUCCESS,
	GET_WORKERS_FAIL,
	USER_LOGOUT,
	GET_TASKS_SUCCESS,
} from './Dashboard.actions';

const INITIAL_STATE = {
	workers: null,
}

export const DashboardReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_WORKERS_SUCCESS:
			return {...state, workers: action.payload }
		case USER_LOGOUT:
			return INITIAL_STATE;
		default:
			return state;
	}
}