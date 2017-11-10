import React, { Component } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import compose from 'recompose/compose'
import _ from 'lodash'





import { Link } from 'react-router-dom'

import * as auth from './actions/auth'

import GlobalMask from './components/GlobalMask';

import Login from './Login'
import Nav from './components/Nav'

class Main extends Component {

  static PropTypes = {
    dispatch: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  submit = ({ username, password }) => {

    const { login, location } = this.props

    login({ username, password }, location.state ? location.state.nextPathname : '/');
  }

  componentDidMount() {
    const { dispatch, checkAuth } = this.props
    dispatch(checkAuth())

  }

  render() {

    const { auth, location, menu } = this.props

    return (
      <div >
        {(auth.pending) && <GlobalMask size='large' />}
        {(!auth.pending && !auth.authed) ? <Login /> : <div>
          <Nav
            location={location}
            menuData={menu}
          />Main</div>}

      </div>

    )
  }
}

const enhance = compose(
  // connect to store
  connect(
    (state) => {
      return { auth: _.get(state, 'auth', false), menu: state.statics.menu_data }
    },
    (dispatch) => {
      return { checkAuth: auth.check, dispatch: dispatch }
    }
  )
)

export default enhance(Main)
