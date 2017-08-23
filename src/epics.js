import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { LoginEpic, AppEpic } from './modules';

const epics = combineEpics(
	AppEpic.hideSnackbar,
	LoginEpic.userLogin
);

export const epicMiddleware = createEpicMiddleware(epics);