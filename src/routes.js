import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { requireAuth, checkAuth } from './util';
import {
	App, 
	Login, 
	Dashboard
} from './modules';


export default (
	<Route path="/" component={App}>
		<IndexRoute component={requireAuth(Dashboard)} />
		<Route path="/login" component={checkAuth(Login)}/>
	</Route>
);