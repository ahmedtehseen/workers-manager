import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { LoginEpic, AppEpic, AddUserEpic } from './modules';

const epics = combineEpics(
	AppEpic.hideSnackbar,
	LoginEpic.userLogin,
	AddUserEpic.addUser,
	AddUserEpic.createUser
);

export const epicMiddleware = createEpicMiddleware(epics);