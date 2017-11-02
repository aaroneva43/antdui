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



const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const middleware = [routerMiddleware(history), sagaMiddleware]

// support redux-dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))

sagaMiddleware.run(sagas)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter basename="/somedir" history={history}>
          <div>
            <Route path="/login" render={({ location }) => {
              return createElement(Login, {
                location

              })
            }} />
            <Route path="/simpleform" render={({ location }) => {
              return createElement(SimpleForm, {
                location

              })
            }} />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App

