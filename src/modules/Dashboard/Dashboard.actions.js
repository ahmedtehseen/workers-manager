export const USER_LOGOUT = 'USER_LOGOUT';

export const GET_WORKERS = 'GET_WORKERS';
export const GET_WORKERS_SUCCESS = 'GET_WORKERS_SUCCESS';
export const GET_WORKERS_FAIL = 'GET_WORKERS_FAIL';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_FAIL = 'GET_TASKS_FAIL';

export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAIL = 'DELETE_TASK_FAIL';

export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';

export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const ADD_NOTE_FAIL = 'ADD_NOTE_FAIL';

export const userLogout = () => {
	return {
		type: USER_LOGOUT,
	}
}

export const getAllWorkers = () => {
	return {
		type: GET_WORKERS
	}
} 

export const deleteTask = (key) => {
	return {
		type: DELETE_TASK,
		payload: key
	}
}

export const currentTask = (task) => {
	return {
		type: SET_CURRENT_TASK,
		payload: task
	}
}

export const addNote = (props) => {
	return {
		type: ADD_NOTE,
		payload: props
	}
}