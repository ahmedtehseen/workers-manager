import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { LoginEpic, AppEpic, AddUserEpic, TaskEpic, DashboardEpic, EditTaskEpic } from './modules';

const epics = combineEpics(
	AppEpic.hideSnackbar,
	LoginEpic.userLogin,
	AddUserEpic.addUser,
	TaskEpic.uploadFile,
	TaskEpic.addTask,
	DashboardEpic.getAllWorkers,
	// DashboardEpic.getAllManagers,
	DashboardEpic.deleteTask,
	DashboardEpic.addNote,
	DashboardEpic.deleteNote,
	DashboardEpic.deliverTask,
	DashboardEpic.reAssignTask,
	EditTaskEpic.uploadFile,
	EditTaskEpic.editTask
);

export const epicMiddleware = createEpicMiddleware(epics);