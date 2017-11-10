import React, { Component, createElement } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App'


import Login from './Login'
import Main from './Main'
import SimpleForm from './SimpleForm'
import Users from './Users'

export default (
    <div>
        <Route path="/" render={({ location }) => { return createElement(Main, { location }) }} >
            {/* <IndexRoute component={SimpleForm} /> */}
            {/* <Route path="users" component={Users} /> */}
        </Route>
        {/* <Route path="/simpleform" render={({ location }) => {
            return createElement(SimpleForm, {
                location

            })
        }} /> */}
    </div>
)
