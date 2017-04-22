import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { CounterEpic } from './containers';

const epics = combineEpics(
	CounterEpic.increment,
);

export const epicMiddleware = createEpicMiddleware(epics);