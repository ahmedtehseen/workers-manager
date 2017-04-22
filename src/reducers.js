import { combineReducers } from 'redux';

import {
	CounterInitialState,
 	CounterReducer 
} from './containers';

export const rootInitialState = {
}

export let rootReducer = combineReducers({
	counter: CounterReducer,
});
