import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { requireAuth, checkAuth } from './util';
import {
	App, 
	Login, 
	Dashboard,
	TaskTable,
	Task,
	Chat,
	ChatList,
	ChatBox
} from './modules';


export default (
	<Route path="/" component={App}>
		<IndexRoute component={checkAuth(Login)} />
		<Route path="/dashboard" component={requireAuth(Dashboard)}>
			<IndexRoute component={TaskTable} />
			<Route path="/task/:key" component={Task} />
			<Route path="/chat" component={Chat}>
				<IndexRoute component={ChatList}/>
				<Route path="/chat/:key" component={ChatBox}/>
			</Route>
		</Route>
	</Route>
);