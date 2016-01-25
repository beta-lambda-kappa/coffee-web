import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import { syncHistory, routeReducer } from 'react-router-redux';
import reducers from './reducers';
import getRoutes from './root';

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);
const createStoreWithMiddleware = compose(
  applyMiddleware(reduxRouterMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('mount')
)
