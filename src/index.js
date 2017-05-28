import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import {store} from './store'
import routes from './routes'

import './index.css'

injectTapEventPlugin()

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store}>
	  	<Router history={browserHistory} routes={routes} />
	  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
