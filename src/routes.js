import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {App} from './containers';
import {Dashboard} from './containers';
import {Counter} from './containers';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />
		<Route path="counter" component={Counter}/>
	</Route>
);