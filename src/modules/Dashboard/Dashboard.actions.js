export const USER_LOGOUT = 'USER_LOGOUT';

export const GET_WORKERS = 'GET_WORKERS';
export const GET_WORKERS_SUCCESS = 'GET_WORKERS_SUCCESS';
export const GET_WORKERS_FAIL = 'GET_WORKERS_FAIL';

// export const GET_MANAGERS = 'GET_MANAGERS';
// export const GET_MANAGERS_SUCCESS = 'GET_MANAGERS_SUCCESS';
// export const GET_MANAGERS_FAIL = 'GET_MANAGERS_FAIL';

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

export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAIL = 'DELETE_NOTE_FAIL';

export const DELIVER_TASK = 'DELIVER_TASK';
export const DELIVER_TASK_SUCCESS = 'DELIVER_TASK_SUCCESS';
export const DELIVER_TASK_FAIL = 'DELIVER_TASK_FAIL';

export const REASSIGN_TASK = 'REASSIGN_TASK';
export const REASSIGN_TASK_SUCCESS = 'REASSIGN_TASK_SUCCESS';
export const REASSIGN_TASK_FAIL = 'REASSIGN_TASK_FAIL';

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

// export const getAllManagers = () => {
// 	return {
// 		type: GET_MANAGERS,
// 	}
// }

export const deleteTask = (props) => {
	return {
		type: DELETE_TASK,
		payload: props
	}
}

export const currentTask = (props) => {
	return {
		type: SET_CURRENT_TASK,
		payload: props
	}
}

export const addNote = (props) => {
	return {
		type: ADD_NOTE,
		payload: props
	}
}

export const deleteNote = (props) => {
	return {
		type: DELETE_NOTE,
		payload: props
	}
}

export const deliverTask = (props) => {
	return {
		type: DELIVER_TASK,
		payload: props
	}
}

export const reAssignTask = (props) => {
	return {
		type: REASSIGN_TASK,
		payload: props
	}
}