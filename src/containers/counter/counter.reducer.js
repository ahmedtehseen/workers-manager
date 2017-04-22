import { INCREMENT, DECREMENT } from './counter.actions';

export const CounterInitialState = {};

export const CounterReducer = (state = 0, action) => {
	switch(action.type) {	
		case INCREMENT:
			return state + 1;
		case DECREMENT:
			return state - 1;
		default:
			return state;
	}
};