import React, { Component, createElement } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import compose from 'recompose/compose'
import _ from 'lodash'
import { Route, IndexRoute, Redirect, Switch } from 'react-router';


// import Config from './containers/config/Config'

import { getGidByPath } from './services/Data'

import Grid from './views/grid/Grid'




import { Link } from 'react-router-dom'

import * as auth from './actions/auth'

import GlobalMask from './components/GlobalMask';

import Login from './Login'
import Nav from './components/Nav'

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      widget: null,
      gid: null
    }
  }

  static PropTypes = {
    dispatch: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired
  }

  submit = ({ username, password }) => {

    const { login, location } = this.props

    login({ username, password }, location.state ? location.state.nextPathname : '/');
  }

  componentWillReceiveProps(nextProps) {
    const { menu } = nextProps

    let gid,
      path = nextProps.location.pathname

    if (!_.isEmpty(menu)) {
      gid = getGidByPath(path, menu)
    }

    if (gid)
      this.setState(!_.isNaN(_.toNumber(gid)) ? { gid: gid } : { widget: gid })

  }

  componentDidMount() {
    const { dispatch, checkAuth } = this.props
    dispatch(checkAuth())

  }

  render() {

    const { auth, location, menu } = this.props

    const gid = this.state.gid,
      defaultPath = "/system/administrator/accprofile"

    return (
      <div >
        {(auth.pending) && <GlobalMask size='large' />}
        {
          (!auth.pending && !auth.authed) ?
            <Login /> :
            <div>
              <Nav
                location={location}
                menuData={menu}
              />

              <Switch>
                <Redirect from="/" exact to={defaultPath} render={({ location }) => { return createElement(Grid, { gid }) }} />

                <Route path="/" render={({ location }) => { return createElement(Grid, { gid }) }} />

              </Switch>
            </div>
        }

      </div>

    )
  }
}

const enhance = compose(
  // connect to store
  connect(
    (state) => {
      return { auth: _.get(state, 'auth', false), menu: _.get(state, 'statics.menu_data') }
    },
    (dispatch) => {
      return { checkAuth: auth.check, dispatch: dispatch }
    }
  )
)

export default enhance(Main)
