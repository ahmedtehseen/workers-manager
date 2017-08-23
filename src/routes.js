import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {App, Login} from './containers';
import {Dashboard} from './containers';
import {Counter} from './containers';
import { requireAuth, checkAuth } from './util';


export default (
	<Route path="/" component={App}>
		<IndexRoute component={requireAuth(Dashboard)} />
		<Route path="/login" component={checkAuth(Login)}/>
	</Route>
);