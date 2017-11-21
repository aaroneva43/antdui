import React, { Component, createElement } from 'react';
import { Route, IndexRoute, Redirect, Switch } from 'react-router';

import App from './containers/App'


import Login from './Login'
import Main from './Main'
import Foo from './Foo'
import Foo1 from './Foo1'

import SimpleForm from './SimpleForm'
import Users from './Users'

export default (
    <div>
        <Switch>
            {/* <Redirect from="/" to="/super_admin_system/administrator/admin" render={({ location }) => { return createElement(Main, { location }) }} /> */}

            <Route path="/" render={({ location }) => { return createElement(Main, { location }) }} >
                {/* <IndexRoute component={SimpleForm} /> */}
                {/* <Route path="users" component={Users} /> */}
            </Route>
            {/* <Route path="/simpleform" render={({ location }) => {
            return createElement(SimpleForm, {
                location

            })
        }} /> */}

            {/* <Route path="/slb/:id" exact render={({ history, location, match }) => { return createElement(Foo, { location }) }} />
        <Route path="/llb/@@new@@" exact render={({ history, location, match }) => { debugger; return createElement(Foo1, { location }) }} /> */}

        </Switch>
    </div>
)
