export const INCREMENT = 'INCREMENT';
export const PROCESS_INCREMENT = 'PROCESS_INCREMENT';
export const SUCCESS_INCREMENT = 'SUCCESS_INCREMENT';
export const ERROR_INCREMENT = 'ERROR_INCREMENT';
export const DECREMENT = 'DECREMENT';

export function increment() {
	return {
		type: INCREMENT,
	}
}

export function decrement() {
	return {
		type: DECREMENT,
	}
}