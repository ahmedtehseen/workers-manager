import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import {store} from './store'
import routes from './routes'

import './index.css'

injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store}>
	  	<Router history={history} routes={routes} />
	  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
