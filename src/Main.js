import React, { Component } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import compose from 'recompose/compose'

import { Card, Button, Form } from 'antd'






import { Link } from 'react-router-dom'

import * as auth from './actions/auth'


class Main extends Component {

  static PropTypes = {
  }

  submit = ({ username, password }) => {

    const { login, location } = this.props

    login({ username, password }, location.state ? location.state.nextPathname : '/');
  }

  render() {
    const { dispatch, checkAuth } = this.props

    console.log(dispatch)

    dispatch(checkAuth())

    return (
      <div>
        Main
      </div>

    )
  }
}

const enhance = compose(
  // decorate with redux-form
  // reduxForm({
  //   form: 'sssss'
  // }),
  // connect to store
  connect(null, { checkAuth: auth.check })
)

export default enhance(Main)
