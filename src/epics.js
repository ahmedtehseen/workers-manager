import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { LoginEpic, AppEpic, AddUserEpic, TaskEpic, DashboardEpic } from './modules';

const epics = combineEpics(
	AppEpic.hideSnackbar,
	LoginEpic.userLogin,
	AddUserEpic.addUser,
	TaskEpic.uploadFile,
	TaskEpic.addTask,
	DashboardEpic.getAllWorkers,
	DashboardEpic.deleteTask
);

export const epicMiddleware = createEpicMiddleware(epics);