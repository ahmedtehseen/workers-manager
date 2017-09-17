import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { requireAuth, checkAuth } from './util';
import {
	App, 
	Login, 
	Dashboard,
	TaskTable,
	Task,
	TotalTasks,
	CompletedTasks,
	Chat,
	ChatList,
	ChatBox,
	WorkerList,
	Reports,
	Report
} from './modules';


export default (
	<Route path="/" component={App}>
		<IndexRoute component={checkAuth(Login)} />
		<Route path="/dashboard" component={requireAuth(Dashboard)}>
			<IndexRoute component={TaskTable} />
			<Route path="/total-tasks" component={TotalTasks} />
			<Route path="/completed-tasks" component={CompletedTasks} />
			<Route path="/task/:key" component={Task} />
			<Route path="/chat" component={Chat}>
				<IndexRoute component={ChatList}/>
				<Route path="/chat/:key" component={ChatBox}/>
			</Route>
			<Route path="/reports" component={Reports}>
				<IndexRoute component={WorkerList}/>
				<Route path="/reports/:key" component={Report} />
			</Route>
		</Route>
	</Route>
);