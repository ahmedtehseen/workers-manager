export const USER_LOGOUT = 'USER_LOGOUT';

export const GET_WORKERS = 'GET_WORKERS';
export const GET_WORKERS_SUCCESS = 'GET_WORKERS_SUCCESS';
export const GET_WORKERS_FAIL = 'GET_WORKERS_FAIL';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_FAIL = 'GET_TASKS_FAIL';


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

export const getTasks = () => {
	return {
		type: GET_TASKS
	}
}