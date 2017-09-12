import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { LoginEpic, AppEpic, AddUserEpic, TaskEpic, DashboardEpic, EditTaskEpic, ChatEpic } from './modules';

const epics = combineEpics(
	AppEpic.hideSnackbar,
	LoginEpic.userLogin,
	AddUserEpic.addUser,
	TaskEpic.uploadFile,
	TaskEpic.addTask,
	DashboardEpic.getAllWorkers,
	DashboardEpic.deleteTask,
	DashboardEpic.addNote,
	DashboardEpic.deleteNote,
	DashboardEpic.deliverTask,
	DashboardEpic.reAssignTask,
	EditTaskEpic.uploadFile,
	EditTaskEpic.editTask,
	ChatEpic.sendMessage,
	ChatEpic.getActiveConversation
);

export const epicMiddleware = createEpicMiddleware(epics);