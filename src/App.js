import React, { Component, createElement } from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import reducers from './reducers'

import 'babel-polyfill'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'


import {
  Router,
  Route,
  Link
} from 'react-router-dom';

import Login from './Login'
import SimpleForm from './SimpleForm'

import routes from './routes'

import { getStatics } from './actions/statics'


const history = createHistory({ basename: '/ui' })
const sagaMiddleware = createSagaMiddleware()
const middleware = [routerMiddleware(history), sagaMiddleware]

// support redux-dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))

sagaMiddleware.run(sagas)

// load statics
store.dispatch(
  getStatics([
    'statics/config_data/manual/menu.json',
    'statics/config_data/manual/menu_pieces.json',
    'statics/config_data/scanned/gid_node.json',
    'statics/config_data/scanned/macro_gid.json',
    'statics/config_data/scanned/macro_name.json',
    'statics/config_data/scanned/module_fields.json',
    'statics/config_data/scanned/conditions.json',
    'statics/config_data/saved/Specifics.json',
    'statics/config_data/scanned/gid_macro.json'
  ])

)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App

