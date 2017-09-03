import {
	GET_WORKERS_SUCCESS,
	// GET_WORKERS_FAIL,
	USER_LOGOUT,
	// GET_TASKS_SUCCESS,
	SET_CURRENT_TASK
} from './Dashboard.actions';

const INITIAL_STATE = {
	workers: null,
	currentTask: null
}

export const DashboardReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_WORKERS_SUCCESS:
			return {...state, workers: action.payload }
		case USER_LOGOUT:
			return INITIAL_STATE;
		case SET_CURRENT_TASK:
			return {...state, currentTask: action.payload}
		default:
			return state;
	}
}